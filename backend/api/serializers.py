from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    User, Role, RolePermission, MenuItem, MenuPackage, Event, EventInventoryAllocation,
    InventoryItem, Task, EventBilling, VendorExpense, Inquiry, Review,
    Vendor, PurchaseOrder, PurchaseOrderItem, SalesInvoice, SalesInvoiceItem,
    PaymentTransaction, Project, TaskStatus, TaskCategory
)


# ==========================================
# CUSTOM JWT TOKEN SERIALIZER
# ==========================================
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username_or_email = attrs.get('username')
        if username_or_email and '@' in username_or_email:
            try:
                user = User.objects.get(email__iexact=username_or_email)
                attrs['username'] = user.username
            except (User.DoesNotExist, User.MultipleObjectsReturned):
                pass

        data = super().validate(attrs)
        user = self.user
        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': user.role,
            'role_name': user.dynamic_role.name if user.dynamic_role else user.get_role_display(),
            'branch': user.branch,
            'phone': user.phone,
            'department': user.department,
            'profile_picture': user.profile_picture,
            'permissions': UserSerializer(user).data.get('permissions', {}),
        }
        return data


# ==========================================
# 0. ROLES & PERMISSIONS SERIALIZERS
# ==========================================
class RolePermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolePermission
        fields = [
            'id', 'module_key', 'module_label', 'allow_all',
            'can_read', 'can_write', 'can_create', 'can_delete',
            'can_import', 'can_export'
        ]


class RoleSerializer(serializers.ModelSerializer):
    permissions = RolePermissionSerializer(many=True, required=False)
    users_count = serializers.SerializerMethodField()

    class Meta:
        model = Role
        fields = [
            'id', 'name', 'slug', 'description', 'is_active', 'is_system',
            'created_at', 'updated_at', 'permissions', 'users_count'
        ]

    def get_users_count(self, obj):
        return obj.users.count()

    def create(self, validated_data):
        permissions_data = validated_data.pop('permissions', [])
        role = Role.objects.create(**validated_data)
        
        default_modules = [
            ('employee', 'Employee'),
            ('holidays', 'Holidays'),
            ('leaves', 'Leaves'),
            ('events', 'Events'),
            ('sales', 'Sales'),
            ('training', 'Training'),
            ('reports', 'Reports'),
            ('tickets', 'Tickets'),
            ('payroll', 'Payroll'),
            ('packages', 'Packages'),
            ('inventory', 'Inventory'),
        ]
        
        perm_map = {p.get('module_key'): p for p in permissions_data}
        for mod_key, mod_lbl in default_modules:
            p_data = perm_map.get(mod_key, {})
            RolePermission.objects.create(
                role=role,
                module_key=mod_key,
                module_label=mod_lbl,
                allow_all=p_data.get('allow_all', False),
                can_read=p_data.get('can_read', True),
                can_write=p_data.get('can_write', False),
                can_create=p_data.get('can_create', False),
                can_delete=p_data.get('can_delete', False),
                can_import=p_data.get('can_import', False),
                can_export=p_data.get('can_export', False),
            )
        return role

    def update(self, instance, validated_data):
        permissions_data = validated_data.pop('permissions', None)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()

        if permissions_data is not None:
            for p_dict in permissions_data:
                m_key = p_dict.get('module_key')
                if not m_key:
                    continue
                RolePermission.objects.update_or_create(
                    role=instance,
                    module_key=m_key,
                    defaults={
                        'module_label': p_dict.get('module_label', m_key.capitalize()),
                        'allow_all': p_dict.get('allow_all', False),
                        'can_read': p_dict.get('can_read', True),
                        'can_write': p_dict.get('can_write', False),
                        'can_create': p_dict.get('can_create', False),
                        'can_delete': p_dict.get('can_delete', False),
                        'can_import': p_dict.get('can_import', False),
                        'can_export': p_dict.get('can_export', False),
                    }
                )
        return instance


# ==========================================
# 1. ACCOUNTS SERIALIZER
# ==========================================
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    role_name = serializers.CharField(source='dynamic_role.name', read_only=True)
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'dynamic_role', 'role_name', 'branch', 'phone', 'department', 'profile_picture',
            'is_active', 'password', 'date_joined', 'permissions'
        ]

    def get_permissions(self, obj):
        if obj.role == 'superadmin':
            return {'all': True}
        if obj.dynamic_role:
            perms = {}
            for p in obj.dynamic_role.permissions.all():
                perms[p.module_key] = {
                    'allow_all': p.allow_all,
                    'can_read': p.can_read,
                    'can_write': p.can_write,
                    'can_create': p.can_create,
                    'can_delete': p.can_delete,
                    'can_import': p.can_import,
                    'can_export': p.can_export,
                }
            return perms
        return {}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


# ==========================================
# 2. MENU ITEM & PACKAGE SERIALIZERS
# ==========================================
class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'category', 'price', 'cost_price', 'isVeg', 'badge', 'description', 'created_at']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        try:
            ret['price'] = float(ret['price'])
            ret['cost_price'] = float(ret['cost_price'])
        except (ValueError, TypeError):
            pass
        return ret


class MenuPackageSerializer(serializers.ModelSerializer):
    items_details = MenuItemSerializer(source='items', many=True, read_only=True)

    class Meta:
        model = MenuPackage
        fields = ['id', 'name', 'description', 'per_plate_price', 'per_plate_cost', 'items', 'items_details', 'created_at']


# ==========================================
# 3. INVENTORY SERIALIZERS
# ==========================================
class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = ['id', 'name', 'category', 'total_quantity', 'available_quantity', 'unit', 'loss_damage_cost', 'notes']


class EventInventoryAllocationSerializer(serializers.ModelSerializer):
    item_name = serializers.ReadOnlyField(source='item.name')
    item_unit = serializers.ReadOnlyField(source='item.unit')

    class Meta:
        model = EventInventoryAllocation
        fields = ['id', 'event', 'item', 'item_name', 'item_unit', 'quantity_allocated', 'quantity_returned', 'status', 'allocated_at', 'returned_at']


# ==========================================
# 4. VENDOR EXPENSE & BILLING SERIALIZERS
# ==========================================
class VendorExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorExpense
        fields = ['id', 'event', 'vendor_name', 'category', 'amount', 'is_paid', 'invoice_number', 'notes', 'created_at']


class EventBillingSerializer(serializers.ModelSerializer):
    event_name = serializers.ReadOnlyField(source='event.name')
    client_name = serializers.ReadOnlyField(source='event.client_name')

    class Meta:
        model = EventBilling
        fields = [
            'id', 'event', 'event_name', 'client_name',
            'quotation_amount', 'extra_charges', 'total_amount',
            'advance_paid', 'balance_due', 'is_fully_paid',
            'estimated_food_cost', 'internal_staff_cost', 'transport_cost',
            'total_expense', 'net_profit', 'profit_margin_percent',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['total_amount', 'balance_due', 'is_fully_paid', 'total_expense', 'net_profit', 'profit_margin_percent']


# ==========================================
# 5. EVENT SERIALIZERS (With SOP details)
# ==========================================
class EventSerializer(serializers.ModelSerializer):
    assigned_manager_name = serializers.ReadOnlyField(source='assigned_manager.username')
    menu_package_name = serializers.ReadOnlyField(source='menu_package.name')
    menu_items_details = MenuItemSerializer(source='menu_items', many=True, read_only=True)
    billing = EventBillingSerializer(read_only=True)
    vendor_expenses = VendorExpenseSerializer(many=True, read_only=True)
    inventory_allocations = EventInventoryAllocationSerializer(many=True, read_only=True)
    tasks_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'name', 'client_name', 'client_phone', 'client_email',
            'date', 'time', 'venue', 'guest_count', 'status', 'branch',
            'menu_package', 'menu_package_name', 'price',
            'cooking_type', 'menu_items', 'menu_items_details',
            'description', 'requirement',
            'setup_provided', 'live_counters_count', 'waiters_required', 'waiters_count', 'setup_notes',
            'assigned_manager', 'assigned_manager_name',
            'plate_count_revised', 'kitchen_alert_notes',
            'billing', 'vendor_expenses', 'inventory_allocations',
            'tasks_count', 'created_at', 'updated_at'
        ]

    def get_tasks_count(self, obj):
        return obj.tasks.count()


# ==========================================
# 5.5. PROJECTS & TASK STATUS SERIALIZERS
# ==========================================
class ProjectSerializer(serializers.ModelSerializer):
    tasks_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'name', 'code', 'client_name', 'description',
            'status', 'start_date', 'end_date', 'tasks_count',
            'created_at', 'updated_at'
        ]

    def get_tasks_count(self, obj):
        return obj.tasks.count()


class TaskStatusSerializer(serializers.ModelSerializer):
    tasks_count = serializers.SerializerMethodField()

    class Meta:
        model = TaskStatus
        fields = ['id', 'name', 'slug', 'color', 'order', 'is_completed_state', 'tasks_count', 'created_at']

    def get_tasks_count(self, obj):
        return obj.tasks.count()


class TaskCategorySerializer(serializers.ModelSerializer):
    tasks_count = serializers.SerializerMethodField()

    class Meta:
        model = TaskCategory
        fields = ['id', 'name', 'slug', 'color', 'description', 'order', 'tasks_count', 'created_at']

    def get_tasks_count(self, obj):
        return obj.tasks.count()


# ==========================================
# 6. TASKS SERIALIZERS
# ==========================================
class TaskSerializer(serializers.ModelSerializer):
    event_name = serializers.ReadOnlyField(source='event.name')
    project_name = serializers.ReadOnlyField(source='project.name')
    custom_status_name = serializers.ReadOnlyField(source='custom_status.name')
    custom_status_color = serializers.ReadOnlyField(source='custom_status.color')
    task_category_name = serializers.ReadOnlyField(source='task_category.name')
    task_category_color = serializers.ReadOnlyField(source='task_category.color')
    assigned_by_name = serializers.ReadOnlyField(source='assigned_by.username')
    assigned_to_name = serializers.ReadOnlyField(source='assigned_to.username')

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'department', 'priority',
            'project', 'project_name',
            'task_category', 'task_category_name', 'task_category_color',
            'event', 'event_name',
            'assigned_by', 'assigned_by_name',
            'assigned_to', 'assigned_to_name',
            'status', 'custom_status', 'custom_status_name', 'custom_status_color',
            'due_date', 'completed_at', 'staff_notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['assigned_by', 'completed_at', 'created_at', 'updated_at']

    def validate_assigned_to(self, value):
        if value.role != 'employee':
            raise serializers.ValidationError("Tasks can only be assigned to staff with the 'employee' role.")
        return value


class TaskStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['status', 'custom_status', 'staff_notes']


# ==========================================
# 7. INQUIRIES & REVIEWS SERIALIZERS (CMS)
# ==========================================
class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['id', 'name', 'email', 'phone', 'eventType', 'guestCount', 'eventDate', 'status', 'addons', 'createdAt']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.eventDate:
            ret['eventDate'] = instance.eventDate.strftime('%Y-%m-%d')
        if instance.createdAt:
            ret['createdAt'] = instance.createdAt.isoformat()
        return ret


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'author', 'role', 'rating', 'comment', 'status', 'date', 'created_at']


# ==========================================
# 8. VENDOR & SUPPLIERS SERIALIZER
# ==========================================
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'name', 'vendor_type', 'contact_person', 'phone', 'email', 'address', 'gst_number', 'bank_details', 'created_at']


# ==========================================
# 9. PURCHASE ORDERS SERIALIZERS
# ==========================================
class PurchaseOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderItem
        fields = ['id', 'purchase_order', 'inventory_item', 'item_name', 'quantity', 'unit', 'unit_price', 'subtotal']
        read_only_fields = ['subtotal']


class PurchaseOrderSerializer(serializers.ModelSerializer):
    vendor_name = serializers.ReadOnlyField(source='vendor.name')
    event_name = serializers.ReadOnlyField(source='event.name')
    items = PurchaseOrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = PurchaseOrder
        fields = [
            'id', 'po_number', 'vendor', 'vendor_name', 'event', 'event_name',
            'status', 'order_date', 'delivery_date', 'total_amount', 'paid_amount',
            'payment_status', 'notes', 'items', 'created_at', 'updated_at'
        ]
        read_only_fields = ['total_amount', 'payment_status', 'created_at', 'updated_at']


# ==========================================
# 10. SALES INVOICES SERIALIZERS
# ==========================================
class SalesInvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesInvoiceItem
        fields = ['id', 'invoice', 'description', 'quantity', 'unit_price', 'subtotal']
        read_only_fields = ['subtotal']


class SalesInvoiceSerializer(serializers.ModelSerializer):
    event_name = serializers.ReadOnlyField(source='event.name')
    items = SalesInvoiceItemSerializer(many=True, read_only=True)

    class Meta:
        model = SalesInvoice
        fields = [
            'id', 'invoice_number', 'event', 'event_name', 'client_name',
            'client_phone', 'client_email', 'invoice_date', 'due_date',
            'subtotal', 'tax_percent', 'tax_amount', 'discount_amount',
            'total_amount', 'amount_paid', 'balance_due', 'payment_status',
            'payment_method', 'notes', 'items', 'created_at', 'updated_at'
        ]
        read_only_fields = ['subtotal', 'tax_amount', 'total_amount', 'balance_due', 'payment_status', 'created_at', 'updated_at']


# ==========================================
# 11. PAYMENT TRANSACTIONS SERIALIZER
# ==========================================
class PaymentTransactionSerializer(serializers.ModelSerializer):
    event_name = serializers.ReadOnlyField(source='event.name')
    recorded_by_name = serializers.ReadOnlyField(source='recorded_by.username')
    sales_invoice_no = serializers.ReadOnlyField(source='sales_invoice.invoice_number')
    purchase_order_no = serializers.ReadOnlyField(source='purchase_order.po_number')

    class Meta:
        model = PaymentTransaction
        fields = [
            'id', 'receipt_number', 'transaction_type', 'event', 'event_name',
            'sales_invoice', 'sales_invoice_no', 'purchase_order', 'purchase_order_no',
            'vendor', 'party_name', 'amount', 'payment_method', 'transaction_reference',
            'payment_date', 'recorded_by', 'recorded_by_name', 'notes', 'created_at'
        ]
        read_only_fields = ['created_at']


