import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'guruji_caterers.settings')
django.setup()

from api.models import User, MenuItem, Inquiry, Review

def seed():
    # 1. Seed Users for each role
    users_data = [
        {
            "username": "superadmin",
            "email": "superadmin@gurujicaterers.com",
            "first_name": "Chief",
            "last_name": "Executive",
            "role": "superadmin",
            "phone": "+91 99999 11111",
            "department": "Executive Leadership",
            "password": "adminpassword123"
        },
        {
            "username": "admin_rohit",
            "email": "rohit.admin@gurujicaterers.com",
            "first_name": "Rohit",
            "last_name": "Verma",
            "role": "admin",
            "phone": "+91 98888 22222",
            "department": "Operations & Bookings",
            "password": "adminpassword123"
        },
        {
            "username": "manager_priya",
            "email": "priya.manager@gurujicaterers.com",
            "first_name": "Priya",
            "last_name": "Malhotra",
            "role": "manager",
            "phone": "+91 97777 33333",
            "department": "Kitchen & Catering Head",
            "password": "adminpassword123"
        },
        {
            "username": "emp_amit",
            "email": "amit.staff@gurujicaterers.com",
            "first_name": "Amit",
            "last_name": "Kumar",
            "role": "employee",
            "phone": "+91 96666 44444",
            "department": "Live Service Crew",
            "password": "adminpassword123"
        }
    ]

    for u_info in users_data:
        pwd = u_info.pop("password")
        if not User.objects.filter(username=u_info["username"]).exists():
            user = User.objects.create_user(password=pwd, **u_info)
            print(f"Created user: {user.username} [{user.role}]")

    # 2. Seed Menu Items
    menu_data = [
        {
            "name": "Paneer Tikka Angara",
            "category": "starters",
            "price": 380,
            "isVeg": True,
            "badge": "Signature",
            "description": "Charcoal-smoked cottage cheese cubes marinated in Kashmiri chili and hand-pounded spices."
        },
        {
            "name": "Dal Bukhara Special",
            "category": "mains",
            "price": 420,
            "isVeg": True,
            "badge": "Chef Special",
            "description": "Slow-cooked black lentils simmered overnight over clay tandoor with fresh churned white butter."
        },
        {
            "name": "Old Delhi Live Chaat Studio",
            "category": "live",
            "price": 250,
            "isVeg": True,
            "badge": "Popular",
            "description": "Live interactive station featuring crispy Palak Patta Chaat, Dahi Bhalla, and Raj Kachori."
        },
        {
            "name": "Liquid Nitrogen Royal Kulfi",
            "category": "desserts",
            "price": 280,
            "isVeg": True,
            "badge": "Showstopper",
            "description": "Smoky live theatrical dessert counter with saffron rabri, roasted pistachios, and rose caviar."
        }
    ]

    for item in menu_data:
        MenuItem.objects.get_or_create(name=item["name"], defaults=item)

    # 3. Seed Inquiries
    inquiries_data = [
        {
            "name": "Rajesh Singhania",
            "email": "rajesh@singhaniagroup.com",
            "phone": "+91 98111 22334",
            "eventType": "corporate",
            "guestCount": 800,
            "eventDate": "2026-11-20",
            "status": "confirmed",
            "addons": ["Global Salad Bar", "Coffee Lounge"]
        },
        {
            "name": "Vikram Sharma",
            "email": "vikram.sharma@royalweddings.in",
            "phone": "+91 98765 43210",
            "eventType": "wedding",
            "guestCount": 650,
            "eventDate": "2026-12-14",
            "status": "pending",
            "addons": ["Pure Veg & Jain Counter", "Live Delhi Chaat Studio", "Royal Dessert Studio"]
        }
    ]

    for inq in inquiries_data:
        Inquiry.objects.get_or_create(phone=inq["phone"], eventType=inq["eventType"], defaults=inq)

    # 4. Seed Reviews
    reviews_data = [
        {
            "author": "Vikram & Ananya Sharma",
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

    print("All initial data & role accounts (Superadmin, Admin, Manager, Employee) seeded successfully!")

if __name__ == '__main__':
    seed()
