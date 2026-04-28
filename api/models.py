from django.db import models


class Student(models.Model):
  # this stores text upto 100 characters
    name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100)
    # this stores whole number
    age = models.IntegerField()
    domocile = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    # district = models.CharField(max_length=100)

    def __str__(self):
      # this makes student name visible in the admin panel
        return self.name
