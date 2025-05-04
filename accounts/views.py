from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class RegisterApiView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
      
      serializer = CustomUserSerializer(data=request.data)
      print(request.data)
      print(serializer) 
      print ("Good")
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=201)
      return Response(serializer.errors, status=400)
  
  
    
  

class LoginApiView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        print(request.data)
        email = request.data.get('email')
        password = request.data.get('password')
        # print(request)
        print(email)
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
   

class UserListView(APIView):
        
        def get(self, request):
            users = CustomUser.objects.all()
            serializer = CustomUserSerializer(users, many=True)
            return Response(serializer.data)
        

class LogoutApiView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)