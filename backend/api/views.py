from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate, login, logout
from django.db.models import Avg, Sum, Q
from django.utils import timezone
from django.core.exceptions import ValidationError

from .models import (
    User, Role, RolePermission, MenuItem, MenuPackage, Event, EventInventoryAllocation,
    InventoryItem, Task, EventBilling, VendorExpense, Inquiry, Review,
    Vendor, PurchaseOrder, PurchaseOrderItem, SalesInvoice, SalesInvoiceItem,
    PaymentTransaction, Project, TaskStatus
)
from .serializers import (
    CustomTokenObtainPairSerializer,
    UserSerializer,
    RoleSerializer,
    RolePermissionSerializer,
    MenuItemSerializer,
    MenuPackageSerializer,
    InventoryItemSerializer,
    EventInventoryAllocationSerializer,
    EventSerializer,
    ProjectSerializer,
    TaskStatusSerializer,
    TaskSerializer,
    TaskStatusUpdateSerializer,
    EventBillingSerializer,
    VendorExpenseSerializer,
    InquirySerializer,
    ReviewSerializer,
    VendorSerializer,
    PurchaseOrderSerializer,
    PurchaseOrderItemSerializer,
    SalesInvoiceSerializer,
    SalesInvoiceItemSerializer,
    PaymentTransactionSerializer
)
from .permissions import (
    IsSuperAdmin,
    IsAdmin,
    IsManager,
    IsStaffUser,
    EventPermission,
    FinancialPermission,
    IsTaskParticipantOrHigher
)


# ==========================================
# 1. AUTHENTICATION & JWT ENDPOINTS
# ==========================================
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def signin_view(request):
    identifier = request.data.get('username') or request.data.get('email')
    password = request.data.get('password')

    if not identifier or not password:
        return Response(
            {'error': 'Please provide both username/email and password.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = None
    if '@' in identifier:
        try:
            matched_user = User.objects.get(email__iexact=identifier)
            user = authenticate(request, username=matched_user.username, password=password)
        except (User.DoesNotExist, User.MultipleObjectsReturned):
            user = None
    else:
        user = authenticate(request, username=identifier, password=password)

    if user is not None:
        if not user.is_active:
            return Response(
                {'error': 'This account has been deactivated. Contact Super Admin.'},
                status=status.HTTP_403_FORBIDDEN
            )
        login(request, user)
        serializer = UserSerializer(user)
        return Response({
            'success': True,
            'message': f'Welcome back, {user.first_name or user.username}!',
            'user': serializer.data
        })
    else:
        return Response(
            {'error': 'Invalid credentials. Please verify your username/email and password.'},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def signout_view(request):
    logout(request)
    return Response({'success': True, 'message': 'Signed out successfully.'})


@api_view(['GET'])
@permission_classes([AllowAny])
def current_user_view(request):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response({'authenticated': True, 'user': serializer.data})
    return Response({'authenticated': False, 'user': None})


# ==========================================
# 2. EVENTS VIEWSET (Full SOP Lifecycle)
# ==========================================
class EventViewSet(viewsets.ModelViewSet):
    """
    SOP Implementation for Event & Booking:
    - SOP 1: Lead & Quotation generation
    - SOP 2: Confirmation & Resource Blocking (Inventory reservation on 'confirmed')
    - SOP 5: Final Settlement & inventory return to stock
    - Critical Checklist: Quick Last-Minute Plate revision with Kitchen alert
    """
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Event.objects.all().order_by('-date')

        if user.role in ['superadmin', 'admin']:
            return Event.objects.all().order_by('-date')

        if user.role == 'manager':
            return Event.objects.filter(assigned_manager=user).order_by('-date')

        if user.role == 'employee':
            return Event.objects.filter(tasks__assigned_to=user).distinct().order_by('-date')

        return Event.objects.all().order_by('-date')

    def perform_create(self, serializer):
        user = self.request.user
        manager = user if (user.is_authenticated and user.role == 'manager') else serializer.validated_data.get('assigned_manager', None)
        branch = user.branch if user.is_authenticated else 'Main Branch'
        event = serializer.save(assigned_manager=manager, branch=branch)

        # Auto-create Billing record based on selected package & guest count
        pkg = event.menu_package
        quotation = 0.0
        food_cost = 0.0
        if pkg:
            quotation = float(pkg.per_plate_price) * float(event.guest_count)
            food_cost = float(pkg.per_plate_cost) * float(event.guest_count)

        EventBilling.objects.get_or_create(
            event=event,
            defaults={
                'quotation_amount': quotation,
                'estimated_food_cost': food_cost,
            }
        )

    def perform_update(self, serializer):
        user = self.request.user
        event = self.get_object()

        if user.is_authenticated:
            if user.role == 'manager' and event.assigned_manager != user:
                raise PermissionDenied("Managers cannot modify events assigned to other managers.")
            if user.role == 'employee':
                raise PermissionDenied("Employees cannot update events.")

        prev_status = event.status
        updated_event = serializer.save()

        # SOP 2: Auto-block inventory when status changes to 'confirmed'
        if prev_status != 'confirmed' and updated_event.status == 'confirmed':
            for alloc in updated_event.inventory_allocations.filter(status='blocked'):
                item = alloc.item
                if item.available_quantity >= alloc.quantity_allocated:
                    item.available_quantity -= alloc.quantity_allocated
                    item.save()

        # SOP 5: Auto-return inventory when event is 'settled' or 'completed'
        if updated_event.status in ['completed', 'settled']:
            for alloc in updated_event.inventory_allocations.filter(status__in=['blocked', 'dispatched']):
                item = alloc.item
                item.available_quantity = min(item.available_quantity + alloc.quantity_allocated, item.total_quantity)
                item.save()
                alloc.status = 'returned'
                alloc.returned_at = timezone.now()
                alloc.quantity_returned = alloc.quantity_allocated
                alloc.save()

    @action(detail=True, methods=['post'], url_path='last-minute-change')
    def last_minute_change(self, request, pk=None):
        """
        Critical Checklist: "50 plates badha do"
        Instantly updates guest/plate count, recalculates billing,
        and generates high-priority Kitchen Task alerts for staff.
        """
        event = self.get_object()
        extra_plates = int(request.data.get('extra_plates', 0))
        kitchen_note = request.data.get('note', f"Urgent: Client added {extra_plates} extra plates!")

        if extra_plates <= 0:
            return Response({'error': 'Please provide a valid extra plates count.'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Update event plate addition
        event.plate_count_revised = (event.plate_count_revised or 0) + extra_plates
        event.guest_count += extra_plates
        event.kitchen_alert_notes = f"{timezone.now().strftime('%H:%M')} ALERT: +{extra_plates} plates. {kitchen_note}"
        event.save()

        # 2. Update billing charges
        if hasattr(event, 'billing') and event.menu_package:
            plate_rate = float(event.menu_package.per_plate_price)
            event.billing.extra_charges += (extra_plates * plate_rate)
            event.billing.save()

        # 3. Create High-Priority Task for kitchen staff assigned to this event
        kitchen_employees = User.objects.filter(role='employee', department__icontains='Kitchen')
        target_employee = kitchen_employees.first() or User.objects.filter(role='employee').first()

        caller = request.user if request.user.is_authenticated else None
        if target_employee:
            Task.objects.create(
                title=f"🚨 URGENT KITCHEN ALERT: Prepare +{extra_plates} Plates",
                description=f"Immediate prep required for {event.name}. Notes: {kitchen_note}",
                department='kitchen',
                event=event,
                assigned_by=caller,
                assigned_to=target_employee,
                status='pending',
                due_date=timezone.now() + timezone.timedelta(hours=1)
            )

        return Response({
            'success': True,
            'message': f'Added {extra_plates} plates. Kitchen team has been alerted!',
            'event': EventSerializer(event).data
        })


# ==========================================
# 3. MENU PACKAGES VIEWSET
# ==========================================
class MenuPackageViewSet(viewsets.ModelViewSet):
    queryset = MenuPackage.objects.all().order_by('id')
    serializer_class = MenuPackageSerializer
    permission_classes = [AllowAny]


# ==========================================
# 4. INVENTORY & ASSETS VIEWSET
# ==========================================
class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all().order_by('name')
    serializer_class = InventoryItemSerializer
    permission_classes = [AllowAny]


class EventInventoryAllocationViewSet(viewsets.ModelViewSet):
    queryset = EventInventoryAllocation.objects.all().select_related('event', 'item')
    serializer_class = EventInventoryAllocationSerializer
    permission_classes = [AllowAny]


# ==========================================
# 4.5. PROJECTS VIEWSET
# ==========================================
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]


# ==========================================
# 4.6. TASK STATUS VIEWSET
# ==========================================
class TaskStatusViewSet(viewsets.ModelViewSet):
    queryset = TaskStatus.objects.all().order_by('order', 'id')
    serializer_class = TaskStatusSerializer
    permission_classes = [AllowAny]


# ==========================================
# 5. TASKS VIEWSET (Mobile-friendly for Employees)
# ==========================================
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update'] and self.request.user.is_authenticated and self.request.user.role == 'employee':
            return TaskStatusUpdateSerializer
        return TaskSerializer

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Task.objects.all().select_related('event', 'assigned_by', 'assigned_to')

        if user.role in ['superadmin', 'admin']:
            return Task.objects.all().select_related('event', 'assigned_by', 'assigned_to')

        if user.role == 'manager':
            return Task.objects.filter(
                Q(event__assigned_manager=user) | Q(assigned_by=user)
            ).select_related('event', 'assigned_by', 'assigned_to')

        if user.role == 'employee':
            return Task.objects.filter(assigned_to=user).select_related('event', 'assigned_by', 'assigned_to')

        return Task.objects.all().select_related('event', 'assigned_by', 'assigned_to')

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated and user.role == 'employee':
            raise PermissionDenied("Employees cannot create tasks.")

        event = serializer.validated_data.get('event')
        if user.is_authenticated and user.role == 'manager' and event and event.assigned_manager != user:
            raise PermissionDenied("Managers can only assign tasks to events they manage.")

        assigned_by_user = user if user.is_authenticated else None
        serializer.save(assigned_by=assigned_by_user)

    def perform_update(self, serializer):
        user = self.request.user
        task = self.get_object()

        if user.is_authenticated and user.role == 'employee':
            new_status = serializer.validated_data.get('status')
            completed_at = timezone.now() if new_status == 'completed' else None
            serializer.save(completed_at=completed_at)
            return

        if user.is_authenticated and user.role == 'manager':
            if task.event and task.event.assigned_manager != user and task.assigned_by != user:
                raise PermissionDenied("You cannot modify tasks belonging to other managers.")

        new_status = serializer.validated_data.get('status')
        if new_status == 'completed' and not task.completed_at:
            serializer.save(completed_at=timezone.now())
        else:
            serializer.save()


# ==========================================
# 6. BILLING & VENDOR EXPENSES VIEWSETS (P&L Tracking)
# ==========================================
class EventBillingViewSet(viewsets.ModelViewSet):
    queryset = EventBilling.objects.all().select_related('event')
    serializer_class = EventBillingSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated or user.role in ['superadmin', 'admin']:
            return EventBilling.objects.all().select_related('event')
        if user.role == 'manager':
            return EventBilling.objects.filter(event__assigned_manager=user).select_related('event')
        return EventBilling.objects.none()


class VendorExpenseViewSet(viewsets.ModelViewSet):
    queryset = VendorExpense.objects.all().select_related('event')
    serializer_class = VendorExpenseSerializer
    permission_classes = [AllowAny]


# ==========================================
# 7. VENDORS, PURCHASES, SALES & PAYMENTS VIEWSETS
# ==========================================
class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all().order_by('-id')
    serializer_class = VendorSerializer
    permission_classes = [AllowAny]


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseOrderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated or user.role in ['superadmin', 'admin']:
            return PurchaseOrder.objects.all().select_related('vendor', 'event').order_by('-order_date')
        if user.role == 'manager':
            return PurchaseOrder.objects.filter(Q(event__assigned_manager=user) | Q(event__isnull=True)).select_related('vendor', 'event').order_by('-order_date')
        # Employees cannot view POs
        return PurchaseOrder.objects.none()

    def perform_create(self, serializer):
        if not serializer.validated_data.get('po_number'):
            import random
            po_num = f"PO-{timezone.now().strftime('%Y%m%d')}-{random.randint(100, 999)}"
            serializer.save(po_number=po_num)
        else:
            serializer.save()


class SalesInvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = SalesInvoiceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated or user.role in ['superadmin', 'admin']:
            return SalesInvoice.objects.all().select_related('event').order_by('-invoice_date')
        if user.role == 'manager':
            return SalesInvoice.objects.filter(event__assigned_manager=user).select_related('event').order_by('-invoice_date')
        # Employees cannot view sales invoices
        return SalesInvoice.objects.none()

    def perform_create(self, serializer):
        if not serializer.validated_data.get('invoice_number'):
            import random
            inv_num = f"INV-{timezone.now().strftime('%Y%m%d')}-{random.randint(100, 999)}"
            serializer.save(invoice_number=inv_num)
        else:
            serializer.save()


class PaymentTransactionViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentTransactionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated or user.role in ['superadmin', 'admin']:
            return PaymentTransaction.objects.all().select_related('event', 'sales_invoice', 'purchase_order', 'vendor').order_by('-payment_date', '-id')
        if user.role == 'manager':
            return PaymentTransaction.objects.filter(event__assigned_manager=user).select_related('event', 'sales_invoice', 'purchase_order', 'vendor').order_by('-payment_date', '-id')
        return PaymentTransaction.objects.none()

    def perform_create(self, serializer):
        import random
        prefix = "REC" if serializer.validated_data.get('transaction_type') == 'inflow' else "VOU"
        rcpt = f"{prefix}-{timezone.now().strftime('%Y%m%d')}-{random.randint(1000, 9999)}"
        caller = self.request.user if self.request.user.is_authenticated else None
        serializer.save(receipt_number=rcpt, recorded_by=caller)



# ==========================================
# 6.5 ROLES & PERMISSION MATRIX MANAGEMENT
# ==========================================
class RoleViewSet(viewsets.ModelViewSet):
    """
    CRUD for dynamic roles with nested permissions matrix
    """
    queryset = Role.objects.all().prefetch_related('permissions').order_by('id')
    serializer_class = RoleSerializer
    permission_classes = [AllowAny]

    def destroy(self, request, *args, **kwargs):
        role = self.get_object()
        if role.is_system or role.name.lower() in ['admin', 'super admin', 'superadmin']:
            return Response({'error': 'System role cannot be deleted'}, status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['GET', 'POST', 'PUT'])
    def permissions(self, request, pk=None):
        role = self.get_object()
        if request.method == 'GET':
            perms = role.permissions.all().order_by('id')
            return Response(RolePermissionSerializer(perms, many=True).data)

        # Batch update permissions matrix for this role
        perms_data = request.data if isinstance(request.data, list) else request.data.get('permissions', [])
        for p in perms_data:
            m_key = p.get('module_key')
            if not m_key:
                continue
            allow_all = p.get('allow_all', False)
            RolePermission.objects.update_or_create(
                role=role,
                module_key=m_key,
                defaults={
                    'module_label': p.get('module_label', m_key.capitalize()),
                    'allow_all': allow_all,
                    'can_read': True if allow_all else p.get('can_read', True),
                    'can_write': True if allow_all else p.get('can_write', False),
                    'can_create': True if allow_all else p.get('can_create', False),
                    'can_delete': True if allow_all else p.get('can_delete', False),
                    'can_import': True if allow_all else p.get('can_import', False),
                    'can_export': True if allow_all else p.get('can_export', False),
                }
            )
        updated_perms = role.permissions.all().order_by('id')
        return Response(RolePermissionSerializer(updated_perms, many=True).data)


# ==========================================
# 7. USER & TEAM MANAGEMENT
# ==========================================
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def user_list_create(request):
    if request.method == 'GET':
        users = User.objects.all().order_by('id')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        caller = request.user if request.user.is_authenticated else None
        target_role = request.data.get('role', 'employee')

        if target_role == 'superadmin':
            return Response(
                {'error': 'A Super Admin already exists. You cannot create another Super Admin account.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if caller:
            if caller.role in ['manager', 'employee']:
                return Response(
                    {'error': f'{caller.get_role_display()} accounts cannot create users.'},
                    status=status.HTTP_403_FORBIDDEN
                )

            if caller.role == 'admin':
                if target_role in ['admin', 'superadmin']:
                    return Response(
                        {'error': 'Only Super Admin can create Admin accounts.'},
                        status=status.HTTP_403_FORBIDDEN
                    )

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ValidationError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
def user_detail(request, pk):
    try:
        target_user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    caller = request.user if request.user.is_authenticated else None

    if request.method == 'GET':
        serializer = UserSerializer(target_user)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        if request.data.get('role') == 'superadmin' and target_user.role != 'superadmin':
            return Response({'error': 'Cannot promote any account to Super Admin.'}, status=status.HTTP_403_FORBIDDEN)

        if caller and caller.role == 'admin':
            if target_user.role == 'superadmin':
                return Response({'error': 'Admins cannot modify the Super Admin account.'}, status=status.HTTP_403_FORBIDDEN)
            if target_user.role == 'admin' and target_user.pk != caller.pk:
                return Response({'error': 'Only Super Admin can modify other Admin accounts.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = UserSerializer(target_user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if target_user.role == 'superadmin':
            return Response({'error': 'The Super Admin account cannot be deleted.'}, status=status.HTTP_403_FORBIDDEN)

        if caller and caller.role == 'admin':
            if target_user.role in ['admin', 'superadmin']:
                return Response({'error': 'Only Super Admin can delete Admin accounts.'}, status=status.HTTP_403_FORBIDDEN)

        target_user.delete()
        return Response({'success': True, 'message': f'User {target_user.username} deleted successfully'})


# ==========================================
# 8. ANALYTICS & DASHBOARD METRICS (With P&L)
# ==========================================
@api_view(['GET'])
@permission_classes([AllowAny])
def analytics_view(request):
    user = request.user
    if user.is_authenticated and user.role == 'employee':
        # Employees get operational metrics only, zeroed financials
        my_tasks = Task.objects.filter(assigned_to=user)
        return Response({
            'total_events': Event.objects.filter(tasks__assigned_to=user).distinct().count(),
            'active_events': Event.objects.filter(tasks__assigned_to=user, status__in=['confirmed', 'in_progress']).distinct().count(),
            'total_tasks': my_tasks.count(),
            'pending_tasks': my_tasks.filter(status='pending').count(),
            'completed_tasks': my_tasks.filter(status='completed').count(),
            'finance': {
                'total_revenue': 0.0,
                'total_advances': 0.0,
                'total_balance_due': 0.0,
                'total_expense': 0.0,
                'total_profit': 0.0,
                'total_inflows': 0.0,
                'total_outflows': 0.0,
                'total_sales_invoiced': 0.0,
                'total_purchases_ordered': 0.0,
            },
            'total_inquiries': 0,
            'totalInquiries': 0,
            'pendingInquiries': 0,
            'totalStaff': User.objects.count(),
            'totalMenuItems': MenuItem.objects.count(),
            'total_menu_items': MenuItem.objects.count(),
            'average_rating': 5.0,
        })

    # SuperAdmin, Admin, Manager
    total_events = Event.objects.count()
    active_events = Event.objects.filter(status__in=['confirmed', 'in_progress']).count()
    total_tasks = Task.objects.count()
    pending_tasks = Task.objects.filter(status='pending').count()
    completed_tasks = Task.objects.filter(status='completed').count()

    # Financial & P&L Metrics
    financials = EventBilling.objects.aggregate(
        total_revenue=Sum('total_amount'),
        total_advances=Sum('advance_paid'),
        total_balance_due=Sum('balance_due'),
        total_profit=Sum('net_profit'),
        total_expense=Sum('total_expense'),
    )
    
    total_inquiries = Inquiry.objects.count()
    total_menu_items = MenuItem.objects.count()
    avg_rating = Review.objects.filter(status='approved').aggregate(Avg('rating'))['rating__avg'] or 5.0

    total_staff = User.objects.count()
    pending_inquiries = Inquiry.objects.filter(status='pending').count()

    # Detailed Payments Stats
    total_inflows = PaymentTransaction.objects.filter(transaction_type='inflow').aggregate(Sum('amount'))['amount__sum'] or 0.0
    total_outflows = PaymentTransaction.objects.filter(transaction_type='outflow').aggregate(Sum('amount'))['amount__sum'] or 0.0
    total_sales_invoiced = SalesInvoice.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0.0
    total_purchases_ordered = PurchaseOrder.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0.0

    return Response({
        'total_events': total_events,
        'active_events': active_events,
        'total_tasks': total_tasks,
        'pending_tasks': pending_tasks,
        'completed_tasks': completed_tasks,
        'finance': {
            'total_revenue': float(financials['total_revenue'] or 0.0),
            'total_advances': float(financials['total_advances'] or 0.0),
            'total_balance_due': float(financials['total_balance_due'] or 0.0),
            'total_expense': float(financials['total_expense'] or 0.0),
            'total_profit': float(financials['total_profit'] or 0.0),
            'total_inflows': float(total_inflows),
            'total_outflows': float(total_outflows),
            'total_sales_invoiced': float(total_sales_invoiced),
            'total_purchases_ordered': float(total_purchases_ordered),
        },
        'total_inquiries': total_inquiries,
        'totalInquiries': total_inquiries,
        'pendingInquiries': pending_inquiries,
        'totalStaff': total_staff,
        'totalMenuItems': total_menu_items,
        'total_menu_items': total_menu_items,
        'average_rating': round(float(avg_rating), 1),
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def financial_report_view(request):
    """
    Executive Financial Report:
    Event-wise breakdown, Sales Invoices summary, Purchase Orders summary,
    and Net Operating Profit & Cashflow analysis.
    Restricted: Employees cannot view executive financial reports.
    """
    user = request.user
    if user.is_authenticated and user.role == 'employee':
        return Response({'error': 'Unauthorized: Employees do not have access to financial reports.'}, status=status.HTTP_403_FORBIDDEN)

    events_qs = Event.objects.all().order_by('-date')
    if user.is_authenticated and user.role == 'manager':
        events_qs = events_qs.filter(assigned_manager=user)

    event_pnl = []
    for ev in events_qs:
        b = getattr(ev, 'billing', None)
        event_pnl.append({
            'event_id': ev.id,
            'event_name': ev.name,
            'client_name': ev.client_name,
            'date': str(ev.date),
            'guest_count': ev.guest_count,
            'status': ev.status,
            'revenue': float(b.total_amount) if b else 0.0,
            'advance_collected': float(b.advance_paid) if b else 0.0,
            'balance_receivable': float(b.balance_due) if b else 0.0,
            'food_cost': float(b.estimated_food_cost) if b else 0.0,
            'staff_cost': float(b.internal_staff_cost) if b else 0.0,
            'transport_cost': float(b.transport_cost) if b else 0.0,
            'vendor_cost': sum(float(v.amount) for v in ev.vendor_expenses.all()),
            'total_cost': float(b.total_expense) if b else 0.0,
            'net_profit': float(b.net_profit) if b else 0.0,
            'margin_percent': float(b.profit_margin_percent) if b else 0.0,
        })

    # Cashflow Summary (Inflows vs Outflows)
    trans_qs = PaymentTransaction.objects.all().order_by('-payment_date', '-id')
    if user.is_authenticated and user.role == 'manager':
        trans_qs = trans_qs.filter(event__assigned_manager=user)
    recent_transactions = trans_qs[:25]
    cashflow = PaymentTransactionSerializer(recent_transactions, many=True).data

    return Response({
        'summary': {
            'total_events_tracked': len(event_pnl),
            'total_gross_revenue': sum(e['revenue'] for e in event_pnl),
            'total_expenses': sum(e['total_cost'] for e in event_pnl),
            'net_operating_profit': sum(e['net_profit'] for e in event_pnl),
            'total_receivables': sum(e['balance_receivable'] for e in event_pnl),
        },
        'events_pnl': event_pnl,
        'recent_cashflow': cashflow
    })



# ==========================================
# 9. EXISTING CATERING CMS VIEWS (Retained)
# ==========================================
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def menu_list_create(request):
    if request.method == 'GET':
        items = MenuItem.objects.all().order_by('id')
        category = request.GET.get('category')
        if category and category != 'all':
            items = items.filter(category=category)
        serializer = MenuItemSerializer(items, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MenuItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def menu_detail_delete(request, pk):
    try:
        item = MenuItem.objects.get(pk=pk)
    except MenuItem.DoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
    item.delete()
    return Response({'success': True, 'message': 'Dish removed'})


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def inquiry_list_create(request):
    if request.method == 'GET':
        inquiries = Inquiry.objects.all().order_by('-createdAt')
        serializer = InquirySerializer(inquiries, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'inquiry': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH', 'DELETE'])
@permission_classes([AllowAny])
def inquiry_detail(request, pk):
    try:
        inquiry = Inquiry.objects.get(pk=pk)
    except Inquiry.DoesNotExist:
        return Response({'error': 'Inquiry not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        serializer = InquirySerializer(inquiry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'inquiry': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        inquiry.delete()
        return Response({'success': True, 'message': 'Inquiry deleted'})


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def review_list_create(request):
    if request.method == 'GET':
        reviews = Review.objects.all().order_by('-id')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def review_detail_delete(request, pk):
    try:
        rev = Review.objects.get(pk=pk)
    except Review.DoesNotExist:
        return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
    rev.delete()
    return Response({'success': True, 'message': 'Review deleted'})
