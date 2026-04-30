from django.contrib import admin
from .models import Student, Teacher, Subject


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialization', 'email')


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    # We removed 'display_teacher' and replaced it with 'teacher'
    # This uses the default Django link instead of a custom function
    list_display = ('name', 'teacher')


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'father_name', 'city')
    filter_horizontal = ('enrolled_subjects',)
