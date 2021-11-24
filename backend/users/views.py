from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import TokenSerializer, UserSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        if User.objects.filter(username=username).exists():
            return Response(
                {
                    'detail': 'Choose another username',
                    'target': 'username'
                },
                status=status.HTTP_400_BAD_REQUEST)
        if len(password) < 8:
            return Response(
                {'detail': 'Password must be at least 8 characters long'},
                status=status.HTTP_400_BAD_REQUEST)
        User.objects.create_user(username=username, password=password)
        return Response({'detail': 'Sign up successful'},
                        status=status.HTTP_201_CREATED)


class LoginView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            serialized_token = TokenSerializer(
                data={
                    'token': str(refresh.access_token),
                    'refresh': str(refresh)
                })
            serialized_token.is_valid()
            return Response(serialized_token.data)
        return Response({'msg': 'unauthorized'},
                        status=status.HTTP_401_UNAUTHORIZED)
