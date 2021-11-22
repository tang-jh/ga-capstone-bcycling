from rest_framework import serializers, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from .models import Broute
from .serializers import BrouteSerializer


# Create your views here.
class BrouteViewSet(viewsets.ModelViewSet):
    queryset = Broute.objects.all()
    serializer_class = BrouteSerializer

    # @action(detail=False, methods=['GET'])
    # def far():
    #     queryset = Broute.objects.filter(distance__gte=2000)
    #     serializer = BrouteSerializer(queryset, many=True)
    #     return Response(serializer.data)