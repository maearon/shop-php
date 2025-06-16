from django.urls import path
from . import views

app_name = 'microposts'

urlpatterns = [
    path('create/', views.create_micropost, name='create'),
    path('<int:pk>/', views.micropost_detail, name='detail'),
    path('<int:pk>/delete/', views.delete_micropost, name='delete'),
]
