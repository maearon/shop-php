"""
URL configuration for django_boilerplate project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.static_pages.urls')),
    path('accounts/', include('apps.accounts.urls')),
    path('microposts/', include('apps.microposts.urls')),
    path('relationships/', include('apps.relationships.urls')),
    path('api/', include('apps.core.api_urls')),
    path('auth/', include('allauth.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
