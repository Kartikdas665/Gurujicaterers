from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User, MenuItem, MenuPackage, Event, EventInventoryAllocation,
    InventoryItem, Task, EventBilling, VendorExpense, Inquiry, Review,
    Vendor, PurchaseOrder, PurchaseOrderItem, SalesInvoice, SalesInvoiceItem,
    PaymentTransaction
)

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'role', 'phone', 'branch', 'department', 'is_staff', 'is_superuser')
    list_filter = ('role', 'branch', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'email', 'phone', 'first_name', 'last_name')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role & Catering Profile', {'fields': ('role', 'phone', 'branch', 'department', 'profile_picture')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Role & Catering Profile', {'fields': ('role', 'phone', 'branch', 'department', 'profile_picture')}),
    )

class EventInventoryInline(admin.TabularInline):
    model = EventInventoryAllocation
    extra = 1

class VendorExpenseInline(admin.TabularInline):
    model = VendorExpense
    extra = 1

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'client_name', 'date', 'venue', 'guest_count', 'status', 'assigned_manager', 'branch')
    list_filter = ('status', 'branch', 'date')
    search_fields = ('name', 'client_name', 'client_phone', 'venue')
    inlines = [EventInventoryInline, VendorExpenseInline]

@admin.register(MenuPackage)
class MenuPackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'per_plate_price', 'per_plate_cost', 'created_at')
    search_fields = ('name',)

@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'available_quantity', 'total_quantity', 'unit', 'loss_damage_cost')
    list_filter = ('category',)
    search_fields = ('name',)

@admin.register(EventInventoryAllocation)
class EventInventoryAllocationAdmin(admin.ModelAdmin):
    list_display = ('event', 'item', 'quantity_allocated', 'quantity_returned', 'status', 'allocated_at')
    list_filter = ('status',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'event', 'assigned_by', 'assigned_to', 'status', 'due_date')
    list_filter = ('status', 'department', 'due_date')
    search_fields = ('title', 'description', 'assigned_to__username')

@admin.register(EventBilling)
class EventBillingAdmin(admin.ModelAdmin):
    list_display = ('event', 'total_amount', 'advance_paid', 'balance_due', 'net_profit', 'profit_margin_percent', 'is_fully_paid')
    list_filter = ('is_fully_paid',)

@admin.register(VendorExpense)
class VendorExpenseAdmin(admin.ModelAdmin):
    list_display = ('vendor_name', 'category', 'amount', 'event', 'is_paid')
    list_filter = ('category', 'is_paid')

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'cost_price', 'isVeg', 'badge')
    list_filter = ('category', 'isVeg')
    search_fields = ('name', 'description')

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'eventType', 'guestCount', 'eventDate', 'status')
    list_filter = ('status', 'eventType')
    search_fields = ('name', 'phone', 'email')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author', 'role', 'rating', 'status', 'date')
    list_filter = ('rating', 'status')
    search_fields = ('author', 'comment')

class PurchaseOrderItemInline(admin.TabularInline):
    model = PurchaseOrderItem
    extra = 1

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('name', 'vendor_type', 'contact_person', 'phone', 'gst_number')
    list_filter = ('vendor_type',)
    search_fields = ('name', 'contact_person', 'phone')

@admin.register(PurchaseOrder)
class PurchaseOrderAdmin(admin.ModelAdmin):
    list_display = ('po_number', 'vendor', 'event', 'status', 'total_amount', 'paid_amount', 'payment_status', 'order_date')
    list_filter = ('status', 'payment_status', 'order_date')
    search_fields = ('po_number', 'vendor__name')
    inlines = [PurchaseOrderItemInline]

class SalesInvoiceItemInline(admin.TabularInline):
    model = SalesInvoiceItem
    extra = 1

@admin.register(SalesInvoice)
class SalesInvoiceAdmin(admin.ModelAdmin):
    list_display = ('invoice_number', 'event', 'client_name', 'total_amount', 'amount_paid', 'balance_due', 'payment_status', 'invoice_date')
    list_filter = ('payment_status', 'invoice_date')
    search_fields = ('invoice_number', 'client_name', 'client_phone')
    inlines = [SalesInvoiceItemInline]

@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = ('receipt_number', 'transaction_type', 'party_name', 'amount', 'payment_method', 'transaction_reference', 'payment_date')
    list_filter = ('transaction_type', 'payment_method', 'payment_date')
    search_fields = ('receipt_number', 'party_name', 'transaction_reference')

