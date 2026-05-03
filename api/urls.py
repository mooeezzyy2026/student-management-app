from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('teachers/', views.teacher_list, name='teacher_list'),
    # Ensure no 's' in student_list
    path('students/', views.student_list, name='student_list'),
    path('subjects/', views.subject_list, name='subject_list'),
    path('students/<int:pk>/', views.student_detail, name='student_detail'),
]
