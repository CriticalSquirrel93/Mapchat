from django.urls import path
from authentication import view

urlpatterns = [
    path('login', view.login),
    path('firebase_login_save', view.firebase_login_save),
]
