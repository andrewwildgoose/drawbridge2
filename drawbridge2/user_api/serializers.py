from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import StoredCredential


UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(email=clean_data['email'],
            password=clean_data['password'])
        user_obj.username = clean_data['username']
        user_obj.save()
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], 
            password=clean_data['password'])
        if not user:
            raise ValidationError('User not found')
        return user 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =  UserModel
        fields = ('username', 'email')


class StoredCredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoredCredential
        fields = ['user_id', 'title', 'username', 'password', 'url']


class PasswordGenerationSerializer(serializers.Serializer):
    length = serializers.IntegerField()
    include_lower = serializers.BooleanField()
    include_upper = serializers.BooleanField()
    include_number = serializers.BooleanField()
    include_special = serializers.BooleanField()