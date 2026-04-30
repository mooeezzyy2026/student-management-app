from django.db import models


class Teacher(models.Model):
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
        null=True,   # Add this
        blank=True   # Add this
    )

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100)
    dob = models.DateField(null=True, blank=True)  # Add this line
    age = models.IntegerField()
    city = models.CharField(max_length=100)
    domocile = models.CharField(max_length=100)
    enrolled_subjects = models.ManyToManyField('Subject', blank=True)
    # FIXED: Using 'Subject' in quotes prevents the "Subject is not defined" error
    enrolled_subjects = models.ManyToManyField('Subject', blank=True)

    def __str__(self):
        return self.name
