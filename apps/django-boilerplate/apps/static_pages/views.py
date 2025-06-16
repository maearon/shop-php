from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from apps.microposts.models import Micropost
from apps.microposts.forms import MicropostForm


def home(request):
    if request.user.is_authenticated:
        # Show user's feed
        microposts = request.user.feed()
        paginator = Paginator(microposts, 2)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        
        form = MicropostForm()
        
        context = {
            'page_obj': page_obj,
            'form': form,
            'microposts_count': request.user.microposts_count(),
            'following_count': request.user.following_count(),
            'followers_count': request.user.followers_count(),
        }
        return render(request, 'static_pages/home_logged_in.html', context)
    else:
        return render(request, 'static_pages/home.html')


def about(request):
    return render(request, 'static_pages/about.html')


def help_page(request):
    return render(request, 'static_pages/help.html')


def contact(request):
    return render(request, 'static_pages/contact.html')
