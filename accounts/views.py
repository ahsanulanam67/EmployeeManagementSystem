from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate

# Create your views here.

class RegisterApiView(APIView):
    
    def post(self, request):
      
      serializer = CustomUserSerializer(data=request.data)
      
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=201)
      return Response(serializer.errors, status=400)
  
  
    
  

class LoginApiView(APIView):
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
   
    