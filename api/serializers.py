# from rest_framework import serializers
# from .models import Student, Teacher, Subject


# class TeacherSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Teacher
#         fields = '__all__'


# class SubjectSerializer(serializers.ModelSerializer):
#     # This shows the teacher's name instead of just their ID number
#     teacher_name = serializers.ReadOnlyField(source='teacher.name')

#     class Meta:
#         model = Subject
#         Fields = ['id', 'name', 'teacher', 'teacher_name']


# class StudentSerializer(serializers.ModelSerializer):
#     # This allows you to see the list of subject names in your frontend
#     enrolled_subjects_detail = SubjectSerializer(
#         source='enrolled_subjects',
#         many=True,
#         read_only=True
#     )


# class Meta:
#     model = Student
#     fields = [
#         'id', 'name', 'father_name', 'age',
#         'city', 'domocile', 'enrolled_subjects',
#         'enrolled_subjects_detail'
#     ]


from rest_framework import serializers
from .models import Student, Teacher, Subject


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:  # This was missing or incorrectly indented!
        model = Student
        fields = '__all__'  # This was missing!


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'  # This was missing!
