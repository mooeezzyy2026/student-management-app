from django.db import models
from django.contrib.auth.models import User


class Teacher(models.Model):
    # This links the Teacher profile to a specific Login Account
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='teacher_profile',
        null=True,
        blank=True
    )
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.CASCADE,
        related_name='subjects',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name


class Student(models.Model):
    # This links the Student profile to a specific Login Account
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='student_profile',
        null=True,
        blank=True
    )
    name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100)
    dob = models.DateField(null=True, blank=True)
    age = models.IntegerField()
    city = models.CharField(max_length=100)
    domocile = models.CharField(max_length=100)
    enrolled_subjects = models.ManyToManyField('Subject', blank=True)

    def __str__(self):
        return self.name
