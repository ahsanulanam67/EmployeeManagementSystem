from django.contrib import admin
from .models import Employer
from django.contrib.auth import get_user_model

# Register your models here.
class EmployerAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'contact_person_name', 'email', 'phone_number', 'address', 'created_at')
    
    
admin.site.register(Employer, EmployerAdmin)