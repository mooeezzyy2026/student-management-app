from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
      # indicates which model to translate
        model = Student
        # Translate every column (id, name, age,
        fields = '__all__'
