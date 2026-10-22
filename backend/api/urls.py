from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'events', views.EventViewSet, basename='event')
router.register(r'packages', views.MenuPackageViewSet, basename='package')
router.register(r'inventory', views.InventoryItemViewSet, basename='inventory')
router.register(r'allocations', views.EventInventoryAllocationViewSet, basename='allocation')
router.register(r'tasks', views.TaskViewSet, basename='task')
router.register(r'billing', views.EventBillingViewSet, basename='billing')
router.register(r'vendors', views.VendorExpenseViewSet, basename='vendor')
router.register(r'suppliers', views.VendorViewSet, basename='supplier')
router.register(r'purchases', views.PurchaseOrderViewSet, basename='purchase')
router.register(r'sales', views.SalesInvoiceViewSet, basename='sale')
router.register(r'payments', views.PaymentTransactionViewSet, basename='payment')

urlpatterns = [
    # JWT Authentication Endpoints
    path('auth/jwt/token', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/jwt/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    # Session & Legacy Auth
    path('auth/signin', views.signin_view, name='signin'),
    path('auth/signout', views.signout_view, name='signout'),
    path('auth/me', views.current_user_view, name='current_user'),

    # Analytics, P&L & Detailed Financial Report
    path('analytics', views.analytics_view, name='analytics'),
    path('financial-report', views.financial_report_view, name='financial_report'),

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

    # Router Endpoints for SOP Core Modules
    path('', include(router.urls)),
]
