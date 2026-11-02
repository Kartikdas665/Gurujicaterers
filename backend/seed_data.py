import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'guruji_caterers.settings')
django.setup()

from api.models import (
    User, MenuItem, MenuPackage, Event, EventInventoryAllocation,
    InventoryItem, Task, EventBilling, VendorExpense, Inquiry, Review,
    Vendor, PurchaseOrder, PurchaseOrderItem, SalesInvoice, SalesInvoiceItem,
    PaymentTransaction
)
from django.utils import timezone
from datetime import timedelta

def seed():
    # 1. Seed Users
    users_data = [
        {
            "username": "superadmin",
            "email": "superadmin@gurujicaterers.com",
            "first_name": "Super",
            "last_name": "Admin",
            "role": "superadmin",
            "phone": "+91 99999 11111",
            "department": "Executive Leadership",
            "password": "superadmin123"
        },
        {
            "username": "kartik_das",
            "email": "admin@gurujicaterers.com",
            "first_name": "Kartik",
            "last_name": "Das",
            "role": "admin",
            "phone": "+91 98888 22222",
            "department": "Operations",
            "password": "admin123"
        },
        {
            "username": "shivansh_singh",
            "email": "manager@gurujicaterers.com",
            "first_name": "Shivansh",
            "last_name": "Sign",
            "role": "manager",
            "phone": "+91 97777 33333",
            "department": "Event Operations",
            "password": "manager123"
        },
        {
            "username": "chef_ramesh",
            "email": "chef@gurujicaterers.com",
            "first_name": "Ramesh",
            "last_name": "Chef",
            "role": "employee",
            "phone": "+91 96666 44444",
            "department": "Kitchen Operations",
            "password": "employee123"
        }
    ]

    for u_info in users_data:
        pwd = u_info.pop("password")
        if not User.objects.filter(username=u_info["username"]).exists():
            user = User.objects.create_user(password=pwd, **u_info)
            print(f"Created user: {user.username} [{user.role}]")

    # 2. Seed Menu Items
    menu_items = [
        {"name": "Awadhi Dum Gosht Biryani", "category": "mains", "price": 450.0, "cost_price": 180.0, "isVeg": False, "badge": "Signature", "description": "Slow cooked in sealed clay handis with basmati rice and royal saffron."},
        {"name": "Paneer Tikka Angara", "category": "starters", "price": 280.0, "cost_price": 95.0, "isVeg": True, "badge": "Chef Special", "description": "Smoked cottage cheese marinated with Kashmiri chilies & mustard oil."},
        {"name": "Dal Bukhara Velvet", "category": "mains", "price": 320.0, "cost_price": 80.0, "isVeg": True, "badge": "Heritage", "description": "Simmered overnight on slow charcoal fire with rich churned butter."},
        {"name": "Live Chaat & Pani Puri Bar", "category": "live", "price": 180.0, "cost_price": 50.0, "isVeg": True, "badge": "Live Counter", "description": "Interactive counter with 6 artisanal water blends and hot aloo tikkis."},
        {"name": "Shahi Tukda with Gold Vark", "category": "desserts", "price": 220.0, "cost_price": 60.0, "isVeg": True, "badge": "Royal Finish", "description": "Crisp fried bread steeped in saffron rabri and topped with edible gold leaf."},
        {"name": "Kesariya Badam Thandai", "category": "beverages", "price": 140.0, "cost_price": 40.0, "isVeg": True, "badge": "Traditional", "description": "Chilled rich milk infused with crushed almonds, fennel, rose and saffron."}
    ]

    for item in menu_items:
        MenuItem.objects.get_or_create(name=item["name"], defaults=item)

    # 3. Seed Menu Package (SOP 1: Pre-set catering packages)
    pkg, _ = MenuPackage.objects.get_or_create(
        name="Royal Shahi Darbar Package",
        defaults={
            "description": "Premium 6-course royal banquet experience with live counter and signature desserts.",
            "per_plate_price": 1450.0,
            "per_plate_cost": 505.0,
        }
    )
    all_dishes = list(MenuItem.objects.all())
    pkg.items.set(all_dishes)

    # 4. Seed Inventory Items (SOP 2: Asset Tracking)
    inventory_items = [
        {"name": "Royal Brass Chafing Dishes (Warming Stations)", "category": "equipment", "total_quantity": 40, "available_quantity": 40, "unit": "sets", "loss_damage_cost": 4500.0},
        {"name": "Gold Chiavari Banquet Chairs", "category": "tent_decor", "total_quantity": 600, "available_quantity": 600, "unit": "pieces", "loss_damage_cost": 1800.0},
        {"name": "Waterproof German Hangar Canopy (40x60 ft)", "category": "tent_decor", "total_quantity": 4, "available_quantity": 4, "unit": "sets", "loss_damage_cost": 45000.0},
        {"name": "Heavy Copper Biryani Deg / Handi (50kg)", "category": "utensil", "total_quantity": 12, "available_quantity": 12, "unit": "pieces", "loss_damage_cost": 8500.0},
        {"name": "High-Pressure LPG Burner Stoves", "category": "equipment", "total_quantity": 20, "available_quantity": 20, "unit": "pieces", "loss_damage_cost": 3200.0},
    ]
    for inv in inventory_items:
        InventoryItem.objects.get_or_create(name=inv["name"], defaults=inv)

    # 5. Seed Event, Resource Allocations, Tasks & Billing (SOP 1 to 5)
    manager = User.objects.filter(role='manager').first()
    chef_staff = User.objects.filter(role='employee').first()

    if manager and chef_staff:
        event, _ = Event.objects.get_or_create(
            name="Sharma & Singhania Grand Wedding Gala",
            defaults={
                "client_name": "Rohan Sharma",
                "client_phone": "+91 98111 22233",
                "client_email": "rohan@sharmagala.in",
                "date": timezone.now().date() + timedelta(days=4),
                "venue": "Grand Hyatt Regency Ballroom, Delhi NCR",
                "guest_count": 500,
                "status": "confirmed",
                "menu_package": pkg,
                "assigned_manager": manager,
                "branch": "Delhi NCR Branch"
            }
        )

        # SOP 2: Allocate & Block Equipment
        chafing = InventoryItem.objects.filter(name__icontains="Chafing").first()
        chairs = InventoryItem.objects.filter(name__icontains="Chiavari").first()
        if chafing:
            EventInventoryAllocation.objects.get_or_create(
                event=event,
                item=chafing,
                defaults={"quantity_allocated": 24, "status": "blocked"}
            )
            chafing.available_quantity = max(chafing.total_quantity - 24, 0)
            chafing.save()
        if chairs:
            EventInventoryAllocation.objects.get_or_create(
                event=event,
                item=chairs,
                defaults={"quantity_allocated": 500, "status": "blocked"}
            )
            chairs.available_quantity = max(chairs.total_quantity - 500, 0)
            chairs.save()

        # SOP 3: Pre-Event Departmental Tasks
        tasks_data = [
            {
                "title": "Kitchen prep: 500 portions Awadhi Dum Biryani & Dal Bukhara",
                "description": "Marination to start 8 hours in advance. Seal deghs with kneaded flour dough.",
                "department": "kitchen",
                "event": event,
                "assigned_by": manager,
                "assigned_to": chef_staff,
                "status": "in_progress",
                "due_date": timezone.now() + timedelta(days=4, hours=-4)
            },
            {
                "title": "Venue inspection: Inspect 24 warming chafing stations & LPG safety",
                "description": "Check safety valves on all 8 live burners and ensure 500 Chiavari chairs are in place.",
                "department": "decor",
                "event": event,
                "assigned_by": manager,
                "assigned_to": chef_staff,
                "status": "pending",
                "due_date": timezone.now() + timedelta(days=4, hours=-2)
            }
        ]
        for t in tasks_data:
            Task.objects.get_or_create(title=t["title"], defaults=t)

        # SOP 1 & 5: Billing & Third-Party Vendor Expense (Halwai, Tent)
        billing, _ = EventBilling.objects.get_or_create(
            event=event,
            defaults={
                "quotation_amount": 725000.0, # 500 * ₹1450
                "extra_charges": 0.0,
                "advance_paid": 300000.0,
                "estimated_food_cost": 252500.0, # 500 * ₹505
                "internal_staff_cost": 35000.0,
                "transport_cost": 15000.0
            }
        )

        VendorExpense.objects.get_or_create(
            event=event,
            vendor_name="Ramlal Shahi Halwai & Sweets Crew",
            defaults={
                "category": "halwai",
                "amount": 42000.0,
                "is_paid": True,
                "invoice_number": "HAL-2026-88"
            }
        )

        VendorExpense.objects.get_or_create(
            event=event,
            vendor_name="Classic Tent & Sound Rentals",
            defaults={
                "category": "rental_furniture",
                "amount": 28000.0,
                "is_paid": False,
                "invoice_number": "RENT-541"
            }
        )

        billing.save()

    # 6. Seed Suppliers & Vendors
    dairy_vendor, _ = Vendor.objects.get_or_create(
        name="Amul Pure Dairy & Paneer Wholesalers",
        defaults={
            "vendor_type": "raw_materials",
            "contact_person": "Harish Patel",
            "phone": "+91 98222 33445",
            "email": "sales@amuldairywholesale.com",
            "gst_number": "07AAAAA0000A1Z5",
            "address": "Okhla Industrial Area Phase-II, New Delhi"
        }
    )

    meat_vendor, _ = Vendor.objects.get_or_create(
        name="Al-Kareem Prime Halal Mutton & Poultry",
        defaults={
            "vendor_type": "meat_poultry",
            "contact_person": "Kareem Bhai",
            "phone": "+91 98111 88990",
            "email": "kareem@alkareemfoods.com",
            "gst_number": "07BBBBB1111B2Z6",
            "address": "Jama Masjid Wholesale Meat Market, Old Delhi"
        }
    )

    # 7. Seed Purchase Orders
    if manager and event:
        po, _ = PurchaseOrder.objects.get_or_create(
            po_number="PO-20261026-001",
            defaults={
                "vendor": dairy_vendor,
                "event": event,
                "status": "ordered",
                "order_date": timezone.now().date(),
                "delivery_date": timezone.now().date() + timedelta(days=2),
                "total_amount": 48500.0,
                "paid_amount": 25000.0,
                "payment_status": "partial",
                "notes": "Urgent: 120kg Malai Paneer and 40kg Desi Ghee for Royal Sangeet."
            }
        )
        PurchaseOrderItem.objects.get_or_create(
            purchase_order=po,
            item_name="Fresh Malai Cottage Cheese (Paneer)",
            defaults={"quantity": 120, "unit": "kg", "unit_price": 320.0, "subtotal": 38400.0}
        )
        PurchaseOrderItem.objects.get_or_create(
            purchase_order=po,
            item_name="Pure Shahi Cow Ghee",
            defaults={"quantity": 20, "unit": "kg", "unit_price": 505.0, "subtotal": 10100.0}
        )

    # 8. Seed Sales Invoices & Payment Transactions (History)
    if event:
        invoice, _ = SalesInvoice.objects.get_or_create(
            invoice_number="INV-20261026-088",
            defaults={
                "event": event,
                "client_name": event.client_name,
                "client_phone": event.client_phone,
                "client_email": event.client_email,
                "invoice_date": timezone.now().date(),
                "due_date": timezone.now().date() + timedelta(days=5),
                "subtotal": 725000.0,
                "tax_percent": 5.0,
                "tax_amount": 36250.0,
                "discount_amount": 0.0,
                "total_amount": 761250.0,
                "amount_paid": 300000.0,
                "balance_due": 461250.0,
                "payment_status": "partial",
                "payment_method": "NEFT / Bank Transfer",
                "notes": "Wedding Gala 500 Pax Royal Shahi Darbar catering contract."
            }
        )
        SalesInvoiceItem.objects.get_or_create(
            invoice=invoice,
            description="Royal Shahi Darbar Banquet Catering (500 Pax)",
            defaults={"quantity": 500, "unit_price": 1450.0, "subtotal": 725000.0}
        )

        # Inflow payment (Client Advance)
        PaymentTransaction.objects.get_or_create(
            receipt_number="REC-20261026-901",
            defaults={
                "transaction_type": "inflow",
                "event": event,
                "sales_invoice": invoice,
                "amount": 300000.0,
                "payment_method": "bank_transfer",
                "transaction_reference": "HDFC-NEFT-992819280",
                "party_name": event.client_name,
                "payment_date": timezone.now().date() - timedelta(days=2),
                "recorded_by": manager,
                "notes": "Booking confirmation advance 40% received via HDFC Bank NEFT."
            }
        )

        # Outflow payment (Vendor Advance)
        PaymentTransaction.objects.get_or_create(
            receipt_number="VOU-20261026-102",
            defaults={
                "transaction_type": "outflow",
                "event": event,
                "vendor": dairy_vendor,
                "amount": 25000.0,
                "payment_method": "upi",
                "transaction_reference": "UPI/20261026/88392019",
                "party_name": dairy_vendor.name,
                "payment_date": timezone.now().date() - timedelta(days=1),
                "recorded_by": manager,
                "notes": "Advance for 120kg Paneer dispatched to Hyatt Regency cold storage."
            }
        )

    # 9. Reviews
    reviews_data = [
        {
            "author": "Pooja & Rohan Sharma",
            "role": "Destination Wedding, Udaipur Palace",
            "rating": 5,
            "comment": "Guruji Caterers made our wedding reception truly unforgettable! Every single guest praised the live chaat and Awadhi Biryani.",
            "status": "approved",
            "date": "2 weeks ago"
        },
        {
            "author": "Rajesh Singhania",
            "role": "Annual Corporate Summit (800 Pax)",
            "rating": 5,
            "comment": "Hosting 800 corporate delegates requires clockwork precision. The food was delivered piping hot with incredible consistency.",
            "status": "approved",
            "date": "1 month ago"
        }
    ]
    for rev in reviews_data:
        Review.objects.get_or_create(author=rev["author"], defaults=rev)

    print("Complete Catering & Event SOP Seed Data applied successfully!")

if __name__ == '__main__':
    seed()
