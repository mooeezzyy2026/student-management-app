from django.contrib import admin
from django.urls import path
# Make sure you import student_detail here!
from api.views import student_list, student_detail

urlpatterns = [
    path('admin/', admin.site.urls),

    # This handles GET (list) and POST (create)
    path('students/', student_list),

    # This handles PUT (edit) and DELETE (remove)
    # The name here must match the name in views.py
    path('students/<int:pk>/', student_detail),
]
