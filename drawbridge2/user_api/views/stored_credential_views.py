from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import *
from rest_framework import permissions, status, generics
from ..models import StoredCredential
from ..password_tools import password_builder


class StoredCredentialListView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = StoredCredential.objects.all()
    serializer_class = StoredCredentialSerializer

class StoredCredentialDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    queryset = StoredCredential.objects.all()
    serializer_class = StoredCredentialSerializer


class GeneratePasswordView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    ##
    def post(self, request):
        serializer = PasswordGenerationSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.data
            length = data['length']
            include_lower = data['include_lower']
            include_upper = data['include_upper']
            include_number = data['include_number']
            include_special = data['include_special']

            generated_password = password_builder.build_password(length, include_lower, include_upper, include_number, include_special)

            return Response({"password": generated_password}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StoreCredentialView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        print(f"Request.data: {request.data}")
        data_with_user = dict(request.data)  # Assuming you're sending data in the request body
        data_with_user['user_id'] = request.user.user_id
        print(f"Data with user: {data_with_user}")
        serializer = StoredCredentialSerializer(data=data_with_user)
        if serializer.is_valid():
            serializer.save()  # Save the new stored credential
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)