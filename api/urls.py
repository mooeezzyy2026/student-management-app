from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.student_list, name='student_list'),
    path('students/<int:pk>/', views.student_detail, name='student_detail'),
    path('teachers/', views.teacher_list, name='teacher_list'),
    path('subjects/', views.subject_list, name='subject_list'),
    path('login/', views.login_view, name='login'),
]
