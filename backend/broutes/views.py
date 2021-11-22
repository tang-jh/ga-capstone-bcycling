from rest_framework import serializers, status, viewsets
from rest_framework import generics
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework.decorators import action, api_view, permission_classes
from django.db.models import Q, Subquery
from .models import Broute
from friends.models import Friend
from .serializers import BrouteSerializer


# Create your views here.
class BrouteViewSet(viewsets.ModelViewSet):
    queryset = Broute.objects.all()
    serializer_class = BrouteSerializer
    permission_classes = [IsAuthenticated]

    # def list(self, request):
    #     print(f'Request User: {request.user}')
    #     return Response()


class DashboardView(generics.ListAPIView):
    serializer_class = BrouteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        is_requester = Q(requester=self.request.user)
        not_accepted = Q(accepted__isnull=False)
        friends = Friend.objects.filter(is_requester
                                        & not_accepted).values_list(
                                            'to_friend', flat=True)
        friend_feed = Broute.objects.filter(userFK__in=Subquery(friends))
        return friend_feed