from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
from .models import Teacher, Student, Subject


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username', '').strip()
            password = data.get('password', '').strip()
            user = authenticate(username=username, password=password)
            if user is not None:
                role = "teacher" if hasattr(
                    user, 'teacher_profile') or user.is_superuser else "student"
                return JsonResponse({
                    "role": role,
                    "user": {"username": user.username, "id": user.pk}
                })
            return JsonResponse({"error": "Invalid credentials"}, status=401)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = User.objects.create_user(
                username=data.get('username'),
                password=data.get('password')
            )
            return JsonResponse({"role": "student", "user": user.username}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)


def teacher_list(request):
    teachers = list(Teacher.objects.all().values(
        'id', 'name', 'specialization', 'email'))
    return JsonResponse(teachers, safe=False)


def student_list(request):
    students = list(Student.objects.all().values(
        'id', 'name', 'age', 'city', 'father_name'))
    return JsonResponse(students, safe=False)


def subject_list(request):
    subjects = list(Subject.objects.all().values('id', 'name', 'teacher_id'))
    return JsonResponse(subjects, safe=False)


def student_detail(request, pk):
    student = get_object_or_404(Student, pk=pk)
    return JsonResponse({
        "id": student.pk,
        "name": student.name,
        "age": student.age,
        "city": student.city,
        "father_name": student.father_name
    })
