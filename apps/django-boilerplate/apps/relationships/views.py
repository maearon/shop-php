from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from apps.accounts.models import User
from .models import Relationship


@login_required
@require_http_methods(["POST"])
def follow_user(request, pk):
    user_to_follow = get_object_or_404(User, pk=pk)
    
    if request.user == user_to_follow:
        messages.error(request, "You cannot follow yourself.")
        return redirect('accounts:user_detail', pk=pk)
    
    relationship, created = Relationship.objects.get_or_create(
        follower=request.user,
        followed=user_to_follow
    )
    
    if created:
        messages.success(request, f'You are now following {user_to_follow.name}!')
    else:
        messages.info(request, f'You are already following {user_to_follow.name}.')
    
    if request.headers.get('Accept') == 'application/json':
        return JsonResponse({
            'status': 'success',
            'following': True,
            'followers_count': user_to_follow.followers_count()
        })
    
    return redirect('accounts:user_detail', pk=pk)


@login_required
@require_http_methods(["DELETE", "POST"])
def unfollow_user(request, pk):
    if request.POST.get("_method") == "DELETE":
        user_to_unfollow = get_object_or_404(User, pk=pk)
        
        relationship = Relationship.objects.filter(
            follower=request.user,
            followed=user_to_unfollow
        ).first()
        
        if relationship:
            relationship.delete()
            messages.success(request, f'You unfollowed {user_to_unfollow.name}.')
        else:
            messages.info(request, f'You are not following {user_to_unfollow.name}.')
        
        if request.headers.get('Accept') == 'application/json':
            return JsonResponse({
                'status': 'success',
                'following': False,
                'followers_count': user_to_unfollow.followers_count()
            })
        
        return redirect('accounts:user_detail', pk=pk)
