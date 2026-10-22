from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    User, MenuItem, MenuPackage, Event, EventInventoryAllocation,
    InventoryItem, Task, EventBilling, VendorExpense, Inquiry, Review,
    Vendor, PurchaseOrder, PurchaseOrderItem, SalesInvoice, SalesInvoiceItem,
    PaymentTransaction
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
            'branch': user.branch,
            'phone': user.phone,
            'department': user.department,
            'profile_picture': user.profile_picture,
        }
        return data


# ==========================================
# 1. ACCOUNTS SERIALIZER
# ==========================================
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'branch', 'phone', 'department', 'profile_picture',
            'is_active', 'password', 'date_joined'
        ]

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
    billing = EventBillingSerializer(read_only=True)
    vendor_expenses = VendorExpenseSerializer(many=True, read_only=True)
    inventory_allocations = EventInventoryAllocationSerializer(many=True, read_only=True)
    tasks_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'name', 'client_name', 'client_phone', 'client_email',
            'date', 'venue', 'guest_count', 'status', 'branch',
            'menu_package', 'menu_package_name',
            'assigned_manager', 'assigned_manager_name',
            'plate_count_revised', 'kitchen_alert_notes',
            'billing', 'vendor_expenses', 'inventory_allocations',
            'tasks_count', 'created_at', 'updated_at'
        ]

    def get_tasks_count(self, obj):
        return obj.tasks.count()


# ==========================================
# 6. TASKS SERIALIZERS
# ==========================================
class TaskSerializer(serializers.ModelSerializer):
    event_name = serializers.ReadOnlyField(source='event.name')
    assigned_by_name = serializers.ReadOnlyField(source='assigned_by.username')
    assigned_to_name = serializers.ReadOnlyField(source='assigned_to.username')

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'department', 'priority', 'event', 'event_name',
            'assigned_by', 'assigned_by_name',
            'assigned_to', 'assigned_to_name',
            'status', 'due_date', 'completed_at', 'staff_notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['assigned_by', 'completed_at', 'created_at', 'updated_at']

    def validate_assigned_to(self, value):
        if value.role != 'employee':
            raise serializers.ValidationError("Tasks can only be assigned to staff with the 'employee' role.")
        return value


class TaskStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['status', 'staff_notes']


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


