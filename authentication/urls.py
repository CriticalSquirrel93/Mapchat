from django.urls import path
from authentication import views

urlpatterns = [
    path('login', views.login),
    path('firebase_login_save', views.firebase_login_save),
]
