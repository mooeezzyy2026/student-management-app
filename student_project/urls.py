from django.contrib import admin
from django.urls import path
from api.views import student_list, student_detail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('students/', student_list),
    # This handles PUT (edit) and DELETE (remove)
    path('students/<int:pk>/', student_detail),
]
