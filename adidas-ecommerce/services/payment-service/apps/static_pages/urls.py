from django.urls import path
from . import views

app_name = 'static_pages'

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('help/', views.help_page, name='help'),
    path('contact/', views.contact, name='contact'),
]
