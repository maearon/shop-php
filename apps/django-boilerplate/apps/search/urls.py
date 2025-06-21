# search/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path("", views.search_products, name="search"),
    path("health", views.health_check),  # GET /search/health
    path("products", views.search_products),  # POST /search/products
    path("suggestions", views.get_suggestions),  # GET /search/suggestions?q=...
    path("index", views.index_product),  # POST /search/index
]
