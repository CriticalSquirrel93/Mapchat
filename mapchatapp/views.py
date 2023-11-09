from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from Mapchat import settings
import pyrebase

# Create your views here.

# Remember the code we copied from Firebase.
# This can be copied by clicking on the settings icon > project settings, then scroll down in your firebase dashboard

firebase = pyrebase.initialize_app(settings.FIREBASECONFIG)
auth = firebase.auth()
database = firebase.database()

def index(request):
    # accessing our firebase data and storing it in a variable
    return render(request, 'frontpage.html')


@login_required(login_url="/login")
def home(request):
    return render(request, 'home.html')


@login_required(login_url="/login")
def settings(request):
    return render(request, 'settings.html')