from django.contrib import admin
from .models import Student

# This makes the Student table visible in the Admin Dashboard
admin.site.register(Student)
