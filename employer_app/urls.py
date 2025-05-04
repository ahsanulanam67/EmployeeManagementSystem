from django.urls import path
from .views import EmployerView,IndividualEmployerView


urlpatterns = [
    
    path('employers/', EmployerView.as_view(), name='employers'),
    path('employers/<int:pk>/', IndividualEmployerView.as_view(), name='individual_employer')
]