from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, username, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field is required')
        email = self.normalize_email(email) if email else None
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'superadmin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)


# ==========================================
# 0. DYNAMIC ROLES & PERMISSION MATRIX MODULE
# ==========================================
class Role(models.Model):
    """
    Dynamic role model allowing administrators to define roles,
    e.g., Super Admin, Admin, HR Manager, Event Manager, Payroll Manager, Employee, etc.
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)
    is_system = models.BooleanField(default=False, help_text="System roles cannot be deleted")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.name).replace('-', '_')
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class RolePermission(models.Model):
    """
    Per-module permission matrix for a role:
    Modules: Employee, Holidays, Leaves, Events, Sales, Training, Reports, Tickets, Payroll, Packages, Inventory
    Actions: read, write, create, delete, import_perm, export_perm
    """
    MODULE_CHOICES = [
        ('employee', 'Employee / Staff'),
        ('holidays', 'Holidays'),
        ('leaves', 'Leaves'),
        ('events', 'Events'),
        ('sales', 'Sales'),
        ('purchases', 'Purchases & Vendors'),
        ('training', 'Training'),
        ('reports', 'Reports / Analytics'),
        ('tickets', 'Tickets & Inquiries'),
        ('payroll', 'Payroll & Expenses'),
        ('packages', 'Menu & Packages'),
        ('inventory', 'Inventory & Assets'),
    ]

    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='permissions')
    module_key = models.CharField(max_length=50)
    module_label = models.CharField(max_length=100, blank=True, default='')

    # Granular Action Flags
    allow_all = models.BooleanField(default=False)
    can_read = models.BooleanField(default=True)
    can_write = models.BooleanField(default=False)
    can_create = models.BooleanField(default=False)
    can_delete = models.BooleanField(default=False)
    can_import = models.BooleanField(default=False)
    can_export = models.BooleanField(default=False)

    class Meta:
        unique_together = ('role', 'module_key')

    def save(self, *args, **kwargs):
        if self.allow_all:
            self.can_read = True
            self.can_write = True
            self.can_create = True
            self.can_delete = True
            self.can_import = True
            self.can_export = True
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.role.name} - {self.module_key} ({'ALL' if self.allow_all else 'Custom'})"


# ==========================================
# 1. ACCOUNTS & USERS MODULE
# ==========================================
class User(AbstractUser):
    ROLE_CHOICES = [
        ('superadmin', 'Super Admin'),
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('employee', 'Employee'),
    ]

    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='employee')
    dynamic_role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    phone = models.CharField(max_length=20, blank=True, default='')
    branch = models.CharField(max_length=120, blank=True, default='Main Branch')
    department = models.CharField(max_length=100, blank=True, default='Catering Operations')
    profile_picture = models.URLField(blank=True, default='')

    objects = UserManager()

    def clean(self):
        super().clean()
        if self.role == 'superadmin':
            existing = User.objects.filter(role='superadmin')
            if self.pk:
                existing = existing.exclude(pk=self.pk)
            if existing.exists():
                raise ValidationError({'role': 'A Super Admin already exists. Only one Super Admin account is permitted in the system.'})

    def save(self, *args, **kwargs):
        if self.role == 'superadmin':
            existing = User.objects.filter(role='superadmin')
            if self.pk:
                existing = existing.exclude(pk=self.pk)
            if existing.exists():
                raise ValidationError('A Super Admin already exists. You cannot create another Super Admin.')

        # Role assignment logic:
        # If dynamic_role is assigned, derive from dynamic_role name/slug;
        # otherwise, normalize role input: admin -> 'admin', manager -> 'manager', else 'employee'.
        if self.role != 'superadmin':
            input_val = ''
            if self.dynamic_role:
                input_val = f"{self.dynamic_role.name} {self.dynamic_role.slug}".lower()
            elif self.role:
                input_val = str(self.role).lower().strip()

            if 'admin' in input_val:
                self.role = 'admin'
            elif 'manager' in input_val:
                self.role = 'manager'
            else:
                self.role = 'employee'

        if self.role == 'superadmin':
            self.is_superuser = True
            self.is_staff = True
        elif self.role in ['admin', 'manager']:
            self.is_staff = True
            self.is_superuser = False
        else:
            self.is_staff = False
            self.is_superuser = False

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


# ==========================================
# 2. CATERING MENU & KITCHEN MODULE
# ==========================================
class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('starters', 'Starters'),
        ('mains', 'Main Course'),
        ('live', 'Live Stations'),
        ('desserts', 'Desserts'),
        ('beverages', 'Beverages'),
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='mains')
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, help_text="Raw material & prep cost")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, help_text="Selling price per plate item")
    isVeg = models.BooleanField(default=True, verbose_name="Is Vegetarian")
    badge = models.CharField(max_length=100, blank=True, default='')
    description = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (₹{self.price})"


class MenuPackage(models.Model):
    """
    Menu Packages (e.g., Royal Awadhi Wedding, Corporate Gold, Silver Buffet)
    """
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    per_plate_price = models.DecimalField(max_digits=10, decimal_places=2, default=500.0)
    per_plate_cost = models.DecimalField(max_digits=10, decimal_places=2, default=300.0, help_text="Estimated base food raw material cost")
    items = models.ManyToManyField(MenuItem, related_name='packages', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (₹{self.per_plate_price}/plate)"


# ==========================================
# 3. EVENT & BOOKING MODULE
# ==========================================
class Event(models.Model):
    STATUS_CHOICES = [
        ('inquiry', 'Inquiry / Lead'),
        ('quoted', 'Quotation Sent'),
        ('confirmed', 'Confirmed (Advance Received)'),
        ('in_progress', 'In Progress (Live Event)'),
        ('completed', 'Completed'),
        ('settled', 'Settled & Closed'),
        ('cancelled', 'Cancelled'),
    ]

    name = models.CharField(max_length=255)
    client_name = models.CharField(max_length=255)
    client_phone = models.CharField(max_length=50)
    client_email = models.EmailField(blank=True, null=True)
    date = models.DateField(default=timezone.now)
    venue = models.CharField(max_length=255)
    guest_count = models.PositiveIntegerField(default=100)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='inquiry')

    menu_package = models.ForeignKey(
        MenuPackage,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='events'
    )
    assigned_manager = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='managed_events',
        limit_choices_to={'role': 'manager'}
    )
    branch = models.CharField(max_length=120, blank=True, default='Main Branch')

    time = models.TimeField(null=True, blank=True, help_text="Event Start / Meal Time")
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0.0, help_text="Total Event Booking Price / Agreed Amount")
    cooking_type = models.CharField(
        max_length=50,
        choices=[
            ('live_cooking', 'Live Cooking (On-Site Fresh Preparation)'),
            ('pre_cooked', 'Pre-Cooked (Delivered in Insulated Hot Boxes)'),
            ('hybrid', 'Hybrid (Base Pre-Cooked + Live Tandoor/Chaats)'),
        ],
        default='live_cooking'
    )
    menu_items = models.ManyToManyField(MenuItem, related_name='events', blank=True)
    description = models.TextField(blank=True, default='', help_text="General event flow, special instructions & VIP requests")
    requirement = models.TextField(blank=True, default='', help_text="Client specific requirements (Crockery, Theme, Beverage stalls, etc.)")

    # Setup Provided details
    setup_provided = models.BooleanField(default=False, help_text="Whether catering/counter setup is provided")
    live_counters_count = models.PositiveIntegerField(default=0, help_text="Number of live cooking counters required if setup provided")
    waiters_required = models.BooleanField(default=False, help_text="Whether service waiters are required")
    waiters_count = models.PositiveIntegerField(default=0, help_text="Number of waiters required")
    setup_notes = models.TextField(blank=True, default='', help_text="What setup is required (counters, buffet tables, chaffing dishes, etc.)")

    # Quick Last-Minute Plate/Count Revision tracking
    plate_count_revised = models.PositiveIntegerField(null=True, blank=True, help_text="Last-minute plate count addition")
    kitchen_alert_notes = models.TextField(blank=True, default='', help_text="Urgent notes for head chef and crew")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.date} ({self.status})"


# ==========================================
# 4. INVENTORY & ASSETS MODULE (Asset Tracking & Blocking)
# ==========================================
class InventoryItem(models.Model):
    ITEM_TYPES = [
        ('equipment', 'Catering Equipment (Burners, Chafing Dishes, Silverware)'),
        ('tent_decor', 'Tents, Canopies & Furniture (Chairs, Tables, Linens)'),
        ('utensil', 'Kitchen Heavy Utensils (Handis, Kadhais, Trays)'),
        ('raw_material', 'Raw Ingredients & Dry Stock'),
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=ITEM_TYPES, default='equipment')
    total_quantity = models.PositiveIntegerField(default=10)
    available_quantity = models.PositiveIntegerField(default=10)
    unit = models.CharField(max_length=50, default='pieces', help_text="e.g., pcs, sets, kg")
    loss_damage_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, help_text="Replacement cost per unit if lost or stolen")
    notes = models.CharField(max_length=255, blank=True, default='')

    def __str__(self):
        return f"{self.name} [{self.category}] - Avail: {self.available_quantity}/{self.total_quantity} {self.unit}"


class EventInventoryAllocation(models.Model):
    """
    SOP Step 2: Resource Blocking on Event Confirmation to prevent double-booking.
    Returned to available pool post-event on final settlement.
    """
    STATUS_CHOICES = [
        ('blocked', 'Blocked / Reserved'),
        ('dispatched', 'Dispatched to Venue'),
        ('returned', 'Returned to Stock'),
        ('damaged_lost', 'Reported Damaged or Missing'),
    ]

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='inventory_allocations')
    item = models.ForeignKey(InventoryItem, on_delete=models.CASCADE, related_name='allocations')
    quantity_allocated = models.PositiveIntegerField(default=1)
    quantity_returned = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='blocked')
    allocated_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.event.name} -> {self.item.name} ({self.quantity_allocated} {self.item.unit}) [{self.status}]"


# ==========================================
# 4.5. PROJECTS MODULE
# ==========================================
class Project(models.Model):
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('active', 'Active'),
        ('on_hold', 'On Hold'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True, blank=True)
    client_name = models.CharField(max_length=255, blank=True, default='')
    description = models.TextField(blank=True, default='')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='active')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.code:
            import random
            from django.utils.text import slugify
            prefix = slugify(self.name)[:6].upper() or "PRJ"
            self.code = f"{prefix}-{random.randint(100, 999)}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.status})"


# ==========================================
# 4.6. TASK STATUS MASTER MODULE
# ==========================================
class TaskStatus(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    color = models.CharField(max_length=20, default='#60a5fa', help_text="HEX color e.g. #60a5fa")
    order = models.PositiveIntegerField(default=0)
    is_completed_state = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.name).replace('-', '_')
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


# ==========================================
# 4.7. TASK EVENT / CATEGORY MASTER MODULE
# (e.g. Design, Development, Bug, Feature, Setup, Logistics, etc.)
# ==========================================
class TaskCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    color = models.CharField(max_length=20, default='#38bdf8', help_text="HEX color e.g. #38bdf8")
    description = models.TextField(blank=True, default='')
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.name).replace('-', '_')
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


# ==========================================
# 5. TASKS & REAL-TIME STAFF TRACKING MODULE
# ==========================================
class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low Priority'),
        ('medium', 'Medium Priority'),
        ('high', 'High Priority'),
        ('urgent', '🚨 Urgent Alert'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    department = models.CharField(max_length=100, blank=True, default='')
    project = models.ForeignKey(
        Project,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tasks'
    )
    custom_status = models.ForeignKey(
        TaskStatus,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tasks'
    )
    task_category = models.ForeignKey(
        TaskCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tasks'
    )
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='tasks',
        null=True,
        blank=True
    )
    assigned_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_tasks_created'
    )
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='assigned_tasks',
        limit_choices_to={'role': 'employee'}
    )
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    due_date = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    staff_notes = models.TextField(blank=True, default='', help_text="Notes/Feedback entered by employee upon completion")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['due_date', '-created_at']

    def __str__(self):
        return f"{self.title} -> {self.assigned_to.username} [{self.status}]"


# ==========================================
# 6. BILLING, VENDOR EXPENSES & P&L MODULE
# ==========================================
class EventBilling(models.Model):
    """
    SOP Step 1, 2 & 5: Quotation, Advance Payment, Pending Dues, Final Settlement, and Event P&L
    """
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='billing')
    
    # Revenue Side (From Client)
    quotation_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    extra_charges = models.DecimalField(max_digits=12, decimal_places=2, default=0.0, help_text="e.g., last-minute extra plates, special live counters")
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    advance_paid = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    balance_due = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    is_fully_paid = models.BooleanField(default=False)

    # Cost Side (Internal Catering Cost)
    estimated_food_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    internal_staff_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    transport_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)

    # P&L Outputs (Auto-calculated on final settlement)
    total_expense = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    net_profit = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    profit_margin_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_totals(self):
        # 1. Total revenue
        self.total_amount = self.quotation_amount + self.extra_charges
        self.balance_due = max(self.total_amount - self.advance_paid, 0.0)
        self.is_fully_paid = (self.balance_due == 0.0 and self.total_amount > 0)

        # 2. Third-party vendor expenses sum
        vendor_costs = sum(v.amount for v in self.event.vendor_expenses.all())

        # 3. Total expense = food + staff + transport + vendors
        self.total_expense = (
            float(self.estimated_food_cost) +
            float(self.internal_staff_cost) +
            float(self.transport_cost) +
            float(vendor_costs)
        )

        # 4. Net profit and margin
        self.net_profit = float(self.total_amount) - float(self.total_expense)
        if float(self.total_amount) > 0:
            self.profit_margin_percent = round((float(self.net_profit) / float(self.total_amount)) * 100, 2)
        else:
            self.profit_margin_percent = 0.0

    def save(self, *args, **kwargs):
        self.calculate_totals()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Billing for {self.event.name}: Total ₹{self.total_amount} | Profit ₹{self.net_profit}"


class VendorExpense(models.Model):
    """
    Project Manager Critical Requirement:
    Third-party halwai, tent rental, transport, DJ, ice dry supplies, etc.
    Required for accurate event P&L.
    """
    CATEGORY_CHOICES = [
        ('halwai', 'Outside Halwai / Specialist Chef'),
        ('rental_furniture', 'Tent & Extra Chair/Table Rental'),
        ('raw_supplies', 'Special Raw Materials / Dairy / Meat'),
        ('transport', 'Tempo / Van Transportation'),
        ('other', 'Other Vendor Expense'),
    ]

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='vendor_expenses')
    vendor_name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='halwai')
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    is_paid = models.BooleanField(default=False)
    invoice_number = models.CharField(max_length=100, blank=True, default='')
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Automatically update linked event billing P&L
        if hasattr(self.event, 'billing'):
            self.event.billing.save()

    def __str__(self):
        return f"{self.vendor_name} ({self.category}) - ₹{self.amount} for {self.event.name}"


# ==========================================
# 7. PUBLIC INQUIRIES & REVIEWS (CMS)
# ==========================================
class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50)
    eventType = models.CharField(max_length=100, default='wedding')
    guestCount = models.IntegerField(default=100)
    eventDate = models.DateField(default=timezone.now)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    addons = models.JSONField(default=list, blank=True)
    createdAt = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} - {self.eventType} ({self.guestCount} guests)"


class Review(models.Model):
    author = models.CharField(max_length=255)
    role = models.CharField(max_length=255, default='Guest Host')
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    status = models.CharField(max_length=50, default='approved')
    date = models.CharField(max_length=100, default='Recently')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author} ({self.rating}★)"


# ==========================================
# 8. VENDOR & SUPPLIERS MODULE
# ==========================================
class Vendor(models.Model):
    VENDOR_TYPE_CHOICES = [
        ('raw_materials', 'Dairy, Grocery & Spices Supplier'),
        ('meat_poultry', 'Fresh Meat & Seafood Supplier'),
        ('tent_decor', 'Tents, Chairs & Linens Rental Agency'),
        ('crockery_utensils', 'Heavy Utensils & Royal Crockery'),
        ('halwai_crew', 'Third-Party Halwai & Sweets Crew'),
        ('transport', 'Logistics, Tempo & Transportation'),
        ('ice_dry', 'Ice, Dry Ice & Beverage Distributor'),
        ('other', 'Other Service Provider'),
    ]

    name = models.CharField(max_length=255)
    vendor_type = models.CharField(max_length=50, choices=VENDOR_TYPE_CHOICES, default='raw_materials')
    contact_person = models.CharField(max_length=150, blank=True, default='')
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, default='')
    gst_number = models.CharField(max_length=50, blank=True, default='')
    bank_details = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.get_vendor_type_display()})"


# ==========================================
# 9. PURCHASE ORDERS & PROCUREMENT MODULE
# ==========================================
class PurchaseOrder(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft PO'),
        ('ordered', 'Ordered / Dispatched by Vendor'),
        ('received', 'Received & Stocked in Inventory'),
        ('cancelled', 'Cancelled'),
    ]

    po_number = models.CharField(max_length=100, unique=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='purchase_orders')
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, blank=True, related_name='purchase_orders', help_text="Procurement tagged directly to an event")
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='ordered')
    order_date = models.DateField(default=timezone.now)
    delivery_date = models.DateField(null=True, blank=True)
    
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    paid_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    payment_status = models.CharField(max_length=30, choices=[('unpaid', 'Unpaid'), ('partial', 'Partially Paid'), ('paid', 'Fully Paid')], default='unpaid')
    
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def recalculate(self):
        items_sum = sum(float(item.subtotal) for item in self.items.all())
        self.total_amount = items_sum
        if float(self.paid_amount) >= float(self.total_amount) and float(self.total_amount) > 0:
            self.payment_status = 'paid'
        elif float(self.paid_amount) > 0:
            self.payment_status = 'partial'
        else:
            self.payment_status = 'unpaid'

    def __str__(self):
        return f"PO #{self.po_number} - {self.vendor.name} (₹{self.total_amount})"


class PurchaseOrderItem(models.Model):
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='items')
    inventory_item = models.ForeignKey(InventoryItem, on_delete=models.SET_NULL, null=True, blank=True, related_name='purchase_items')
    item_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=1)
    unit = models.CharField(max_length=50, default='kg')
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)

    def save(self, *args, **kwargs):
        self.subtotal = float(self.quantity) * float(self.unit_price)
        super().save(*args, **kwargs)
        self.purchase_order.recalculate()
        self.purchase_order.save()

    def __str__(self):
        return f"{self.item_name} x {self.quantity} {self.unit} = ₹{self.subtotal}"


# ==========================================
# 10. SALES INVOICES & BILLING MODULE
# ==========================================
class SalesInvoice(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Payment Pending'),
        ('partial', 'Partially Received (Advance)'),
        ('paid', 'Fully Settled / Paid'),
        ('overdue', 'Overdue'),
    ]

    invoice_number = models.CharField(max_length=100, unique=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='sales_invoices')
    client_name = models.CharField(max_length=255)
    client_phone = models.CharField(max_length=50)
    client_email = models.EmailField(blank=True, null=True)
    invoice_date = models.DateField(default=timezone.now)
    due_date = models.DateField(null=True, blank=True)

    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    tax_percent = models.DecimalField(max_digits=5, decimal_places=2, default=5.0, help_text="e.g. 5% GST on Catering")
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    balance_due = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    payment_status = models.CharField(max_length=30, choices=PAYMENT_STATUS_CHOICES, default='pending')
    payment_method = models.CharField(max_length=50, blank=True, default='Bank Transfer / UPI')

    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def recalculate(self):
        items_total = sum(float(item.subtotal) for item in self.items.all())
        self.subtotal = items_total
        taxable = max(items_total - float(self.discount_amount), 0.0)
        self.tax_amount = round(taxable * (float(self.tax_percent) / 100.0), 2)
        self.total_amount = taxable + self.tax_amount
        self.balance_due = max(self.total_amount - float(self.amount_paid), 0.0)

        if self.balance_due == 0.0 and self.total_amount > 0:
            self.payment_status = 'paid'
        elif float(self.amount_paid) > 0:
            self.payment_status = 'partial'
        else:
            self.payment_status = 'pending'

    def __str__(self):
        return f"INV #{self.invoice_number} - {self.client_name} (₹{self.total_amount} | {self.payment_status})"


class SalesInvoiceItem(models.Model):
    invoice = models.ForeignKey(SalesInvoice, on_delete=models.CASCADE, related_name='items')
    description = models.CharField(max_length=255, help_text="e.g. Royal Shahi Buffet (500 pax) or Live Counters")
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)

    def save(self, *args, **kwargs):
        self.subtotal = float(self.quantity) * float(self.unit_price)
        super().save(*args, **kwargs)
        self.invoice.recalculate()
        self.invoice.save()

    def __str__(self):
        return f"{self.description} x {self.quantity} = ₹{self.subtotal}"


# ==========================================
# 11. PAYMENT TRANSACTIONS & HISTORY MODULE
# ==========================================
class PaymentTransaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('inflow', 'Inflow / Client Payment (Sales)'),
        ('outflow', 'Outflow / Vendor Payment (Purchase)'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('upi', 'UPI / QR Code'),
        ('bank_transfer', 'NEFT / RTGS / IMPS'),
        ('cash', 'Cash Receipt'),
        ('cheque', 'Cheque Deposit'),
        ('card', 'Credit / Debit Card'),
    ]

    receipt_number = models.CharField(max_length=100, unique=True)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES, default='inflow')
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    sales_invoice = models.ForeignKey(SalesInvoice, on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True, blank=True, related_name='payments')
    
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES, default='upi')
    transaction_reference = models.CharField(max_length=150, blank=True, default='', help_text="Bank UTR / UPI Ref / Cheque No.")
    party_name = models.CharField(max_length=255, help_text="Client Name or Vendor Name")
    payment_date = models.DateField(default=timezone.now)
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='recorded_payments')
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # 1. Update sales invoice if linked
        if self.sales_invoice:
            total_inflows = sum(float(p.amount) for p in self.sales_invoice.payments.all())
            self.sales_invoice.amount_paid = total_inflows
            self.sales_invoice.recalculate()
            self.sales_invoice.save()

        # 2. Update purchase order if linked
        if self.purchase_order:
            total_outflows = sum(float(p.amount) for p in self.purchase_order.payments.all())
            self.purchase_order.paid_amount = total_outflows
            self.purchase_order.recalculate()
            self.purchase_order.save()

    def __str__(self):
        arrow = "🟢 IN" if self.transaction_type == 'inflow' else "🔴 OUT"
        return f"{self.receipt_number} [{arrow} ₹{self.amount}] - {self.party_name}"


