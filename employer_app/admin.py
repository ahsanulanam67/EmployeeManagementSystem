from django.contrib import admin
from .models import Employer
from django.contrib.auth import get_user_model

custom_user = get_user_model()
# Register your models here.
admin.site.register(custom_user)