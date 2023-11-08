from django.urls import path
from .views import *

urlpatterns = [
	path('register', user_views.UserRegister.as_view(), name='register'),
	path('login', user_views.UserLogin.as_view(), name='login'),
	path('logout', user_views.UserLogout.as_view(), name='logout'),
	path('user', user_views.UserView.as_view(), name='user'),
    path('user_saved_credentials', stored_credential_views.StoredCredentialListView.as_view(), name='user_saved_credentials'),
    path('generate_password', stored_credential_views.GeneratePasswordView.as_view(), name='generate_password'),
]