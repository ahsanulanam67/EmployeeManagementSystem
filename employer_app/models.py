from django.db import models
from django.contrib.auth import get_user_model


CustomUser = get_user_model()

class Employer(models.Model):
 
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="employers")
    company_name = models.CharField(max_length=255)
    contact_person_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=254)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now=True)