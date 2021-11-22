from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Broute
from .serializers import BrouteSerializer


# Create your views here.
class BrouteViewSet(viewsets.ModelViewSet):
    queryset = Broute.objects.all()
    serializer_class = BrouteSerializer
