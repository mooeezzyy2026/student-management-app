from django.contrib import admin
from django.urls import path
from api.views import student_list, student_delete

urlpatterns = [
    # The secret dashboard
    path('admin/', admin.site.urls),
    # Calls the list/add function
    path('students', student_list),
    # Calls delete for a specific ID
    path('students/<int:pk>', student_delete),
]
