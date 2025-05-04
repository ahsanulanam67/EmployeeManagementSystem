from django.urls import path
from .views import RegisterApiView,LoginApiView


urlpatterns = [
    path('login/', LoginApiView.as_view(), name='login'),
    path('register/', RegisterApiView.as_view(), name='register'),
]