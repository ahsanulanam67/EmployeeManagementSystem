from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import EmployerSerializer
from .models import Employer
from rest_framework.permissions import AllowAny
class EmployerView(APIView):
    
    # print("Saboj vai")
    permission_classes = [permissions.IsAuthenticated]   
    def post(self, request):
        serializer = EmployerSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)    
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
                   
    permission_classes = [permissions.IsAuthenticated]   
    def get(self, request):
        
        print("Saboj vai")
        employers = Employer.objects.filter(user=request.user)  
        if employers is None:
            return Response({'error': 'This user have no emloyee'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EmployerSerializer(employers, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)        
 
class IndividualEmployerView(APIView):
    
    permission_classes = [permissions.IsAuthenticated]  
    
    def get(self, request, pk):
        
        employee = Employer.objects.get(pk=pk, user=request.user)
        if not employee:
            return Response({'error': 'This user have no emloyee'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EmployerSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    def put(self, request, pk):
        
        employee = Employer.objects.get(pk=pk,user=request.user)
        
        if not employee:
            return Response({'error': 'This user have no emloyee'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EmployerSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
            
    def delete(self,request,pk):
            
            employee = Employer.objects.get(pk=pk,user=request.user)
            
            if not employee:
                return Response({'error': 'This user have no emloyee'}, status=status.HTTP_404_NOT_FOUND)
            
            employee.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)