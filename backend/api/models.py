from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
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


class User(AbstractUser):
    ROLE_CHOICES = [
        ('superadmin', 'Super Admin'),
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('employee', 'Employee'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')
    phone = models.CharField(max_length=20, blank=True, default='')
    department = models.CharField(max_length=100, blank=True, default='Catering Operations')
    profile_picture = models.URLField(blank=True, default='')

    objects = UserManager()

    def save(self, *args, **kwargs):
        # Automatically align permissions based on role
        if self.role == 'superadmin':
            self.is_superuser = True
            self.is_staff = True
        elif self.role in ['admin', 'manager']:
            self.is_staff = True
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


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
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    isVeg = models.BooleanField(default=True, verbose_name="Is Vegetarian")
    badge = models.CharField(max_length=100, blank=True, default='')
    description = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (₹{self.price})"


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
