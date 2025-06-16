# search/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path("", views.search_products, name="search"),
    path("health", views.health_check),
    path("search", views.search_products),
    path("suggestions", views.get_suggestions),
    path("index/product", views.index_product),
]
