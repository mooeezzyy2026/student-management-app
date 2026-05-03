from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # This line "plugs in" the api/urls.py file you just showed me
    path('', include('api.urls')),
]
