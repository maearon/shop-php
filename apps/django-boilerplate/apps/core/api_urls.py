from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.accounts.api_views import UserViewSet
from apps.microposts.api_views import MicropostViewSet
from apps.relationships.api_views import RelationshipViewSet
from apps.events.api_views import EventViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'microposts', MicropostViewSet, basename='micropost')
router.register(r'relationships', RelationshipViewSet, basename='relationship')
router.register(r'events', EventViewSet, basename='event')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls'))
]
