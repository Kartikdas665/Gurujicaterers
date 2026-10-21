from rest_framework import serializers
from .models import User, MenuItem, Inquiry, Review

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone', 'department', 'profile_picture', 'is_active', 'password', 'date_joined']

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


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'category', 'price', 'isVeg', 'badge', 'description', 'created_at']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        try:
            ret['price'] = float(ret['price'])
        except (ValueError, TypeError):
            pass
        return ret


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
