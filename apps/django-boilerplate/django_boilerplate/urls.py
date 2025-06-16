"""
URL configuration for django_boilerplate project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# ✅ Swagger Imports
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

# ✅ Auth static frontend Imports
from django.contrib import admin

# ✅ Auth JWT frontend Imports

# ✅ Schema config
schema_view = get_schema_view(
    openapi.Info(
        title="Geospatial Event Viewer API",
        default_version='v1',
        description="Auto-generated API docs using drf-yasg",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # ✅ Auth static frontend
    path('admin/', admin.site.urls),
    path('', include('apps.static_pages.urls')),
    path('accounts/', include('apps.accounts.urls')),

    # ✅ Auth JWT frontend

    path('microposts/', include('apps.microposts.urls')),
    path('relationships/', include('apps.relationships.urls')),
    path('api/', include('apps.core.api_urls')),
    path('auth/', include('allauth.urls')),

    # ✅ Swagger UI and Redoc
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Static & Media files in dev
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
