from django.contrib.auth.models import User
from django.db.models.expressions import Subquery
from rest_framework import views, viewsets, generics
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from .serializers import FriendSerializer, PeopleSerializer
from .models import Friend
import datetime

now = datetime.datetime.now()


class FriendViewSet(viewsets.ModelViewSet):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        not_accepted = Q(accepted__isnull=True)
        is_rejected = Q(rejected__isnull=False)
        friends = Friend.objects.filter(
            requester=user).exclude(not_accepted).exclude(is_rejected)
        return friends

    def create(self, request):  #friend request
        id = request.data.get('id', '')
        to_friend = User.objects.get(id=id)
        Friend.objects.create(requester=self.request.user, to_friend=to_friend)
        return Response('Friend requested')

    # kiv unfriend method
    # @action(detail=True, methods=['PUT'])
    # def unfriend(self, request, *args, **kwargs):
    #     return super().update(request, *args, **kwargs)


class FriendPendingViewSet(viewsets.ModelViewSet):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        is_accepted = Q(accepted__isnull=False)
        is_rejected = Q(rejected__isnull=False)
        friends = Friend.objects.filter(
            to_friend=user).exclude(is_accepted).exclude(is_rejected)

        return friends

    def update(self, request, pk):  #accept friend method
        # write method to block if user != to_friend
        requester_name = Friend.objects.only('requester').get(
            f_id=pk).requester
        requester = User.objects.get(username=requester_name)
        Friend.objects.filter(f_id=pk).update(accepted=now)
        Friend.objects.create(requester=self.request.user,
                              to_friend=requester,
                              accepted=now)
        return Response(request.data)

    @action(detail=True, methods=['PUT'])
    def reject(self, request, pk):
        # write method to block if user != to_friend
        Friend.objects.filter(f_id=pk).update(rejected=now)
        return Response(request.data)


class PeopleViewSet(viewsets.ModelViewSet):
    serializer_class = PeopleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        acquainted = Friend.objects.filter(requester=user).values_list(
            'to_friend', flat=True)
        people = User.objects.exclude(id__in=Subquery(acquainted)).exclude(
            is_superuser=True).exclude(username=user)
        return people


# class TestViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = PeopleSerializer
