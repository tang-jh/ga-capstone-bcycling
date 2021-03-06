"""bcyclingbackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from broutes.views import BrouteViewSet, BrouteListView, DashboardView, CommentView, CommentDetailView
from users.views import CreateUserView, LoginView, UserViewSet
from friends.views import FriendViewSet, FriendPendingViewSet, PeopleViewSet  #TestViewSet

router = DefaultRouter()
router.register(r'broutes', BrouteViewSet, 'broutes')
router.register(r'friends', FriendViewSet, 'friends')
router.register(r'to_review', FriendPendingViewSet, 'to_review')
router.register(r'people', PeopleViewSet, 'people')
router.register(r'userlookup', UserViewSet, 'userlookup')
# router.register(r'testview', TestViewSet, 'testview')

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/signup/', CreateUserView.as_view()),
    path('api/login/', LoginView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/',
         TokenRefreshView.as_view(),
         name='token_refresh'),
    path('api/dashboard/', DashboardView.as_view()),
    path('api/brouteslist/<pk>/', BrouteListView.as_view()),
    path('api/broutes/<r_id>/comments/', CommentView.as_view()),
    path('api/comments/<pk>/', CommentDetailView.as_view()),
    path('api/', include(router.urls))
]
