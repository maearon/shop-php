from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator
from .models import User
from .serializers import UserSerializer, UserDetailSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(activated=True)
    serializer_class = UserSerializer
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return UserDetailSerializer
        return UserSerializer

    @action(detail=True, methods=['get'])
    def microposts(self, request, pk=None):
        user = self.get_object()
        microposts = user.microposts.all()
        paginator = Paginator(microposts, 30)
        page_number = request.GET.get('page', 1)
        page_obj = paginator.get_page(page_number)
        
        from apps.microposts.serializers import MicropostSerializer
        serializer = MicropostSerializer(page_obj, many=True)
        
        return Response({
            'microposts': serializer.data,
            'total_count': paginator.count,
            'page': page_obj.number,
            'total_pages': paginator.num_pages,
        })

    @action(detail=True, methods=['get'])
    def following(self, request, pk=None):
        user = self.get_object()
        following_users = User.objects.filter(
            passive_relationships__follower=user
        )
        paginator = Paginator(following_users, 30)
        page_number = request.GET.get('page', 1)
        page_obj = paginator.get_page(page_number)
        
        serializer = UserSerializer(page_obj, many=True)
        
        return Response({
            'users': serializer.data,
            'total_count': paginator.count,
            'page': page_obj.number,
            'total_pages': paginator.num_pages,
        })

    @action(detail=True, methods=['get'])
    def followers(self, request, pk=None):
        user = self.get_object()
        followers_users = User.objects.filter(
            active_relationships__followed=user
        )
        paginator = Paginator(followers_users, 30)
        page_number = request.GET.get('page', 1)
        page_obj = paginator.get_page(page_number)
        
        serializer = UserSerializer(page_obj, many=True)
        
        return Response({
            'users': serializer.data,
            'total_count': paginator.count,
            'page': page_obj.number,
            'total_pages': paginator.num_pages,
        })
