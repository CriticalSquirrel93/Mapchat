"""
    Credit
    https://t.me/supercoders
    https://pythonworld.io/blogs/how-to-implement-firebase-authentication-in-django-and-dango-rest-framework
    https://www.youtube.com/@codefirstwithhala
    https://www.techwithtim.net
"""

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import login
from Mapchat import settings
from requests import request
import pyrebase
import json

firebase = pyrebase.initialize_app(settings.FIREBASECONFIG)
auth = firebase.auth()
database = firebase.database()
    
def login_firebase(request):
    return render(request,"login.html")

@csrf_exempt
def firebase_login_save(request):
    username = request.POST.get("username")
    email = request.POST.get("email")
    provider = request.POST.get("provider")
    token = request.POST.get("token")
    firebase_responese=loadDatafromFirebaseApi(token)
    firebase_dict=json.loads(firebase_responese)
    if "users" in firebase_dict:
        user=firebase_dict['users']
        # Setting user data upon initial login
        database.child('Data').child('Users').child(user[0]['localId']).update({'email': email,'username': username})
        if not database.child('Data').child('Users').child(user[0]['localId']).child('Settings').shallow().get().val():
            database.child('Data').child('Users').child(user[0]['localId']).child('Settings').set({'buisness': False,
                                                                                                   'dispaly': False,
                                                                                                   'location': False,
                                                                                                   'dark': False})
        # Checking firebase data for t/f email verification
        user_one=user[0]
        if email==user_one["email"]:
            if user_one["emailVerified"]==1:
                data=proceedToLogin(request,email,username,token,provider)
                return HttpResponse(data)
            else:
                return HttpResponse("Please Verify Your Email to Login")

def loadDatafromFirebaseApi(token):
    url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup"

    payload = 'key=AIzaSyCwzsTIBBd48KlI1IG7hjSuiTQqshaBmV4&idToken='+token
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = request("POST", url, headers=headers, data=payload)
    return response.text

def proceedToLogin(request,email,username,token,provider):
    users=User.objects.filter(username=username).exists()
    # Hand off login to django
    if users==True:
        user_one=User.objects.get(username=username)
        user_one.backend='django.contrib.auth.backends.ModelBackend'
        login(request, user_one)
        return "login_success"
    else:
        user=User.objects.create_user(username=username,email=email,password=settings.SECRET_KEY)
        user_one=User.objects.get(username=username)
        user_one.backend='django.contrib.auth.backends.ModelBackend'
        login(request, user_one)
        return "login_success"