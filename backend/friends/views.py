from django.http.request import _Q
from rest_framework import views, viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from .serializers import FriendSerializer
from .models import Friend


class FriendViewSet(viewsets.ModelViewSet):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        not_accepted = Q(accepted__isnull=True)
        is_rejected = Q(rejected__isnull=False)
        friends = Friend.objects.filter(requester=user).exclude(not_accepted
                                                                & is_rejected)
        return friends  #not tested yet
