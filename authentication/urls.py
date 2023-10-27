from django.urls import path
from authentication import views

urlpatterns = [
    path('login', views.login_firebase),
    path('firebase_login_save', views.firebase_login_save),
]
