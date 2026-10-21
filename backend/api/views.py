from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.db.models import Avg, Q
from django.core.exceptions import ValidationError
from .models import User, MenuItem, Inquiry, Review
from .serializers import UserSerializer, MenuItemSerializer, InquirySerializer, ReviewSerializer

# ================= AUTHENTICATION (SIGN IN ONLY) ================= #

@api_view(['POST'])
@permission_classes([AllowAny])
def signin_view(request):
    """
    Sign In API for Superadmin, Admin, Manager, and Employee.
    Accepts either username or email along with password.
    Public sign up is intentionally disabled.
    """
    identifier = request.data.get('username') or request.data.get('email')
    password = request.data.get('password')

    if not identifier or not password:
        return Response(
            {'error': 'Please provide both username/email and password.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Allow login using either username OR email
    user = None
    if '@' in identifier:
        try:
            matched_user = User.objects.get(email__iexact=identifier)
            user = authenticate(request, username=matched_user.username, password=password)
        except (User.DoesNotExist, User.MultipleObjectsReturned):
            user = None
    else:
        user = authenticate(request, username=identifier, password=password)

    if user is not None:
        if not user.is_active:
            return Response(
                {'error': 'This account has been deactivated. Contact Super Admin.'},
                status=status.HTTP_403_FORBIDDEN
            )
        # Login session
        login(request, user)
        serializer = UserSerializer(user)
        return Response({
            'success': True,
            'message': f'Welcome back, {user.first_name or user.username}!',
            'user': serializer.data
        })
    else:
        return Response(
            {'error': 'Invalid credentials. Please verify your username/email and password.'},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['GET'])
def current_user_view(request):
    """
    Get current logged in user profile
    """
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response({'authenticated': True, 'user': serializer.data})
    return Response({'authenticated': False, 'user': None})


@api_view(['POST'])
def signout_view(request):
    """
    Sign out user session
    """
    logout(request)
    return Response({'success': True, 'message': 'Successfully logged out.'})


# ================= ANALYTICS ================= #

@api_view(['GET'])
def analytics_view(request):
    total_inquiries = Inquiry.objects.count()
    pending_inquiries = Inquiry.objects.filter(status='pending').count()
    confirmed_events = Inquiry.objects.filter(status='confirmed').count()
    total_menu_items = MenuItem.objects.count()
    total_reviews = Review.objects.count()
    total_users = User.objects.count()
    
    avg_rating_res = Review.objects.aggregate(Avg('rating'))
    avg_rating = round(avg_rating_res['rating__avg'] or 4.9, 1)

    return Response({
        'totalInquiries': total_inquiries,
        'pendingInquiries': pending_inquiries,
        'confirmedEvents': confirmed_events,
        'totalMenuItems': total_menu_items,
        'totalReviews': total_reviews,
        'totalStaff': total_users,
        'avgRating': avg_rating,
    })


# ================= USER / TEAM MANAGEMENT (HIERARCHICAL RBAC) ================= #

def get_requesting_actor(request):
    """
    Resolves the requesting user either from active session OR from X-Requester-Id / requester_id param.
    """
    if request.user and request.user.is_authenticated:
        return request.user

    requester_id = request.headers.get('X-Requester-Id') or request.data.get('requester_id') or request.query_params.get('requester_id')
    if requester_id:
        try:
            return User.objects.get(pk=requester_id)
        except (User.DoesNotExist, ValueError):
            pass
    return None


@api_view(['GET', 'POST'])
def user_list_create(request):
    actor = get_requesting_actor(request)

    if request.method == 'GET':
        role_filter = request.query_params.get('role')
        users = User.objects.all().order_by('-id')
        if role_filter:
            users = users.filter(role=role_filter)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        target_role = request.data.get('role', 'employee')

        # 1. Superadmin can NEVER be created again
        if target_role == 'superadmin':
            return Response(
                {'error': 'A Super Admin already exists. You cannot create another Super Admin account.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Enforce Hierarchical Creation Rules:
        # If actor not authenticated or not found
        if not actor:
            return Response(
                {'error': 'Authentication required. Please sign in to create staff accounts.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Manager cannot create anyone
        if actor.role == 'manager':
            return Response(
                {'error': 'Managers can only supervise employees. You do not have permission to create accounts.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Employee cannot create anyone
        if actor.role == 'employee':
            return Response(
                {'error': 'Employees do not have permission to create accounts.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Admin can create manager & employee, but NOT admin or superadmin
        if actor.role == 'admin':
            if target_role in ['admin', 'superadmin']:
                return Response(
                    {'error': 'Only Super Admin can create Admin accounts.'},
                    status=status.HTTP_403_FORBIDDEN
                )

        # Superadmin can create admin, manager, employee (all tiers except duplicate superadmin)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ValidationError as ve:
                return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
def user_detail(request, pk):
    try:
        target_user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    actor = get_requesting_actor(request)

    if request.method == 'GET':
        serializer = UserSerializer(target_user)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        if not actor:
            return Response({'error': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

        # No one can change any user into superadmin
        if request.data.get('role') == 'superadmin' and target_user.role != 'superadmin':
            return Response({'error': 'Cannot promote any account to Super Admin.'}, status=status.HTTP_403_FORBIDDEN)

        # Employee cannot modify anyone
        if actor.role == 'employee':
            return Response({'error': 'Employees cannot edit staff profiles.'}, status=status.HTTP_403_FORBIDDEN)

        # Manager can only view / update employee basic operational details, but cannot change employee roles
        if actor.role == 'manager':
            if target_user.role != 'employee':
                return Response({'error': 'Managers can only manage employees.'}, status=status.HTTP_403_FORBIDDEN)
            if 'role' in request.data:
                return Response({'error': 'Managers cannot alter user roles.'}, status=status.HTTP_403_FORBIDDEN)

        # Admin cannot edit superadmin
        if actor.role == 'admin':
            if target_user.role == 'superadmin':
                return Response({'error': 'Admins cannot modify the Super Admin account.'}, status=status.HTTP_403_FORBIDDEN)
            if target_user.role == 'admin' and target_user.pk != actor.pk:
                return Response({'error': 'Only Super Admin can modify other Admin accounts.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = UserSerializer(target_user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'user': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if not actor:
            return Response({'error': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

        # 1. Superadmin can NEVER be deleted
        if target_user.role == 'superadmin':
            return Response({'error': 'The Super Admin account cannot be deleted.'}, status=status.HTTP_403_FORBIDDEN)

        # 2. Manager cannot delete ANY account
        if actor.role == 'manager':
            return Response({'error': 'Managers cannot delete staff accounts.'}, status=status.HTTP_403_FORBIDDEN)

        # 3. Employee cannot delete ANY account
        if actor.role == 'employee':
            return Response({'error': 'Employees cannot delete staff accounts.'}, status=status.HTTP_403_FORBIDDEN)

        # 4. Admin can delete Manager and Employee, but NOT other Admins or Superadmin
        if actor.role == 'admin':
            if target_user.role in ['admin', 'superadmin']:
                return Response({'error': 'Only Super Admin can delete Admin accounts.'}, status=status.HTTP_403_FORBIDDEN)

        # 5. Superadmin can delete Admin, Manager, and Employee
        target_user.delete()
        return Response({'success': True, 'message': 'User deleted successfully'})


# ================= MENU API ================= #

@api_view(['GET', 'POST'])
def menu_list_create(request):
    if request.method == 'GET':
        items = MenuItem.objects.all().order_by('-id')
        serializer = MenuItemSerializer(items, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MenuItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def menu_detail_delete(request, pk):
    try:
        item = MenuItem.objects.get(pk=pk)
    except MenuItem.DoesNotExist:
        return Response({'error': 'Menu item not found'}, status=status.HTTP_404_NOT_FOUND)

    item.delete()
    return Response({'success': True, 'message': 'Menu item deleted'})


# ================= INQUIRIES API ================= #

@api_view(['GET', 'POST'])
def inquiry_list_create(request):
    if request.method == 'GET':
        inquiries = Inquiry.objects.all().order_by('-id')
        serializer = InquirySerializer(inquiries, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = InquirySerializer(data=request.data)
        if serializer.is_valid():
            inquiry = serializer.save()
            return Response({'success': True, 'inquiry': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH', 'DELETE'])
def inquiry_detail(request, pk):
    try:
        inquiry = Inquiry.objects.get(pk=pk)
    except Inquiry.DoesNotExist:
        return Response({'error': 'Inquiry not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        serializer = InquirySerializer(inquiry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'inquiry': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        inquiry.delete()
        return Response({'success': True, 'message': 'Inquiry deleted'})


# ================= REVIEWS API ================= #

@api_view(['GET', 'POST'])
def review_list_create(request):
    if request.method == 'GET':
        reviews = Review.objects.all().order_by('-id')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def review_detail_delete(request, pk):
    try:
        rev = Review.objects.get(pk=pk)
    except Review.DoesNotExist:
        return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)

    rev.delete()
    return Response({'success': True, 'message': 'Review deleted'})
