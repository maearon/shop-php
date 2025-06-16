from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.views.decorators.http import require_http_methods
from .models import Micropost
from .forms import MicropostForm


@login_required
def create_micropost(request):
    if request.method == 'POST':
        form = MicropostForm(request.POST, request.FILES)
        if form.is_valid():
            micropost = form.save(commit=False)
            micropost.user = request.user
            micropost.save()
            messages.success(request, 'Micropost created!')
            return redirect('static_pages:home')
    else:
        form = MicropostForm()
    return render(request, 'microposts/create.html', {'form': form})


@login_required
@require_http_methods(["DELETE", "POST"])
def delete_micropost(request, pk):
    micropost = get_object_or_404(Micropost, pk=pk)
    
    # Only allow the author or admin to delete
    if request.user == micropost.user or request.user.admin:
        micropost.delete()
        messages.success(request, 'Micropost deleted!')
    else:
        messages.error(request, 'You can only delete your own microposts.')
    
    return redirect('static_pages:home')


def micropost_detail(request, pk):
    micropost = get_object_or_404(Micropost, pk=pk)
    return render(request, 'microposts/detail.html', {'micropost': micropost})
