from django.urls import path
from .views import RegisterApiView,LoginApiView,UserListView,LogoutApiView


urlpatterns = [
    path('login/', LoginApiView.as_view(), name='login'),
    path('register/', RegisterApiView.as_view(), name='register'),
    path('userlist/', UserListView.as_view(), name='userlist'),
     path('logout/', LogoutApiView.as_view(), name='logout'),
]