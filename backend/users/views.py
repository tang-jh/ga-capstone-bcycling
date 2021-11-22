from django.contrib.auth.models import User
# from django.contrib.auth import get_user_model
from django.db.models.query_utils import refs_expression
from rest_framework import generics, serializers, status, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from .serializers import UserSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        if User.objects.filter(username=username).exists():
            return Response({'msg': 'Choose another username'})
        if len(password) < 8:
            return Response(
                {'error': 'Password must be at least 8 characters long'})
        User.objects.create_user(username=username, password=password)

        return Response(request.data)


class LoginView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        username = request.data.get('username', '')
        password = request.data.get('password', '')