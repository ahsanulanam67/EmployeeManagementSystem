from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password']
        
    
    def create(self, validated_data):
        
        print("inside create")
        
        user = CustomUser.objects.create_user(**validated_data)
        return user