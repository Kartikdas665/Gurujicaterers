from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, MenuItem, Inquiry, Review

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'role', 'phone', 'department', 'is_staff', 'is_superuser')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'email', 'phone', 'first_name', 'last_name')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role & Catering Profile', {'fields': ('role', 'phone', 'department', 'profile_picture')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Role & Catering Profile', {'fields': ('role', 'phone', 'department', 'profile_picture')}),
    )

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'isVeg', 'badge')
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
