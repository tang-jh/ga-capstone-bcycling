from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q, Subquery
from .models import Broute, Comment
from friends.models import Friend
from .serializers import BrouteSerializer, CommentSerializer


# Create your views here.
class BrouteViewSet(viewsets.ModelViewSet):
    queryset = Broute.objects.exclude(deleted__isnull=False)
    serializer_class = BrouteSerializer
    permission_classes = [IsAuthenticated]


class DashboardView(generics.ListAPIView):
    serializer_class = BrouteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        is_requester = Q(requester=self.request.user)
        is_accepted = Q(accepted__isnull=False)
        friends = Friend.objects.filter(is_requester
                                        & is_accepted).values_list('to_friend',
                                                                   flat=True)
        friend_feed = Broute.objects.filter(
            userFK__in=Subquery(friends)).exclude(deleted__isnull=False)
        return friend_feed


class CommentView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        comments = Comment.objects.filter(routeFK=self.kwargs['r_id']).exclude(
            deleted__isnull=False)
        return comments

    def create(self, request, r_id):
        print('R_ID ======= ', r_id)
        author = request.user
        comment = request.data.get('comment', '')
        routeFK = Broute.objects.get(r_id=r_id)
        Comment.objects.create(author=author, comment=comment, routeFK=routeFK)
        return Response(request.data)
