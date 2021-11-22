from rest_framework import serializers, status, viewsets
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .models import Broute
from .serializers import BrouteSerializer


# Create your views here.
class BrouteViewSet(viewsets.ModelViewSet):
    queryset = Broute.objects.all()
    serializer_class = BrouteSerializer
    permission_classes = [IsAuthenticated]

    # def list(self, request):
    #     print(f'Request User: {request.user}')
    #     return Response()


# class DashboardView(generics.ListAPIView):
