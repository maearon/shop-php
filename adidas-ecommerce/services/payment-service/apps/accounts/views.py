from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from django.views.decorators.http import require_http_methods
from django.urls import reverse
from .models import User
from .forms import UserCreationForm, UserUpdateForm
from apps.microposts.models import Micropost


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.activated = True  # For simplicity, auto-activate
            user.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
            return redirect('accounts:login')
    else:
        form = UserCreationForm()
    return render(request, 'accounts/signup.html', {'form': form})


def user_list(request):
    users = User.objects.filter(activated=True).order_by('name')
    paginator = Paginator(users, 30)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'accounts/user_list.html', {'page_obj': page_obj})


def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)
    microposts = user.microposts.all()
    paginator = Paginator(microposts, 30)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'user': user,
        'page_obj': page_obj,
        'microposts_count': user.microposts_count(),
        'following_count': user.following_count(),
        'followers_count': user.followers_count(),
    }
    return render(request, 'accounts/user_detail.html', context)


@login_required
def user_edit(request, pk):
    user = get_object_or_404(User, pk=pk)
    
    # Only allow users to edit their own profile or admin users
    if request.user != user and not request.user.admin:
        messages.error(request, "You can only edit your own profile.")
        return redirect('accounts:user_detail', pk=user.pk)
    
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('accounts:user_detail', pk=user.pk)
    else:
        form = UserUpdateForm(instance=user)
    
    return render(request, 'accounts/user_edit.html', {'form': form, 'user': user})


@staff_member_required
@require_http_methods(["DELETE"])
def user_delete(request, pk):
    user = get_object_or_404(User, pk=pk)
    if user != request.user:  # Prevent self-deletion
        user.delete()
        messages.success(request, f'User {user.name} deleted successfully!')
    return redirect('accounts:user_list')


@login_required
def following(request, pk):
    user = get_object_or_404(User, pk=pk)
    following_users = User.objects.filter(
        passive_relationships__follower=user
    ).order_by('name')
    paginator = Paginator(following_users, 30)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'user': user,
        'page_obj': page_obj,
        'title': 'Following',
    }
    return render(request, 'accounts/show_follow.html', context)


@login_required
def followers(request, pk):
    user = get_object_or_404(User, pk=pk)
    followers_users = User.objects.filter(
        active_relationships__followed=user
    ).order_by('name')
    paginator = Paginator(followers_users, 30)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'user': user,
        'page_obj': page_obj,
        'title': 'Followers',
    }
    return render(request, 'accounts/show_follow.html', context)
