from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg
from .models import User, MenuItem, Inquiry, Review
from .serializers import UserSerializer, MenuItemSerializer, InquirySerializer, ReviewSerializer

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


# ================= USER / TEAM MANAGEMENT ================= #
@api_view(['GET', 'POST'])
def user_list_create(request):
    if request.method == 'GET':
        role_filter = request.query_params.get('role')
        users = User.objects.all().order_by('-id')
        if role_filter:
            users = users.filter(role=role_filter)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'user': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
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
