from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse, HttpResponseRedirect
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

def admin_portal_view(request):
    html_file = BASE_DIR / 'static_admin' / 'admin' / 'index.html'
    if os.path.exists(html_file):
        with open(html_file, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')
    return HttpResponse("Admin index.html not found", status=404)

urlpatterns = [
    # Built-in Django Admin
    path('django-admin/', admin.site.urls),
    # REST API endpoints
    path('api/', include('api.urls')),
    # Custom Luxury CMS Admin Portal
    path('admin/', admin_portal_view, name='custom_admin_portal'),
    path('', lambda req: HttpResponseRedirect('/admin/')),
]
