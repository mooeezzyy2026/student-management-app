from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer


@api_view(['GET', 'POST'])
def student_list(request):
    # Get all students
    if request.method == 'GET':
      # Get everyone from MySQL
        students = Student.objects.all()
        # Translate them
        serializer = StudentSerializer(students, many=True)
        # Send back as JSON list
        return Response(serializer.data)

    # Create a new student
    if request.method == 'POST':

        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
          # Save it to MySQL
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE', 'PUT'])
def student_detail(request, pk):
    try:
        # Find the specific student
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
