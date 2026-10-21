from django.urls import path
from . import views

urlpatterns = [
    # Auth (Sign In only, no sign up)
    path('auth/signin', views.signin_view, name='signin'),
    path('auth/signout', views.signout_view, name='signout'),
    path('auth/me', views.current_user_view, name='current_user'),

    # Analytics
    path('analytics', views.analytics_view, name='analytics'),

    # Users / Team Management
    path('users', views.user_list_create, name='user_list_create'),
    path('users/<int:pk>', views.user_detail, name='user_detail'),

    # Menu API
    path('menu', views.menu_list_create, name='menu_list_create'),
    path('menu/<int:pk>', views.menu_detail_delete, name='menu_detail_delete'),

    # Inquiries API
    path('inquiries', views.inquiry_list_create, name='inquiry_list_create'),
    path('inquiries/<int:pk>', views.inquiry_detail, name='inquiry_detail'),

    # Reviews API
    path('reviews', views.review_list_create, name='review_list_create'),
    path('reviews/<int:pk>', views.review_detail_delete, name='review_detail_delete'),
]
