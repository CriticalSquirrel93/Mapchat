from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from Mapchat import settings
from requests import request
import pyrebase
import json

# Create your views here.

# Remember the code we copied from Firebase.
# This can be copied by clicking on the settings icon > project settings, then scroll down in your firebase dashboard
firebaseConfig = {

    "apiKey": "AIzaSyCwzsTIBBd48KlI1IG7hjSuiTQqshaBmV4",
    "authDomain": "mapchat-ef869.firebaseapp.com",
    "databaseURL": "https://mapchat-ef869-default-rtdb.firebaseio.com",
    "projectId": "mapchat-ef869",
    "storageBucket": "mapchat-ef869.appspot.com",
    "messagingSenderId": "233501723438",
    "appId": "1:233501723438:web:5b23fa135663362db808bf",
    "measurementId": "G-7XG223B24F"
}

# Here we are doing firebase authentication
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
database = firebase.database()


def index(request):
    # accessing our firebase data and storing it in a variable
    name = database.child('Data').child('Name').get().val()
    stack = database.child('Data').child('Stack').get().val()
    framework = database.child('Data').child('Framework').get().val()

    context = {
        'name': name,
        'stack': stack,
        'framework': framework
    }
    return render(request, 'index.html', context)

def LoginUser(request):
    if request.user==None or request.user =="" or request.user.username=="":
        return render(request, "login.html")
    else:
        return HttpResponseRedirect("")

def login(request):
    return render(request, "login.html")

@csrf_exempt
def firebase_login_save(request):
    username = request.POST.get("username")
    email = request.POST.get("email")
    provider = request.POST.get("provider")
    token = request.POST.get("token")
    firebase_responese=loadDatafromFirebaseApi(token)
    firebase_dict=json.loads(firebase_responese)


    if "users" in firebase_dict:
        user=firebase_dict["users"]
        if len(user)>0:
            user_one=user[0]
            if email==user_one["email"]:
                if user_one["emailVerified"]==1 or user_one["emailVerified"]==True or user_one["emailVerified"]=="True":
                    data=proceedToLogin(request,email,username,token,provider)
                    return HttpResponse(data)
                else:
                    return HttpResponse("Please Verify Your Email to Get Login")
            else:
                return HttpResponse("Unknown Email User")
        else:
            return HttpResponse("Invalid Request User Not Found")
    else:
        return HttpResponse("Bad Request")

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

    if users==True:
        user_one=User.objects.get(username=username)
        user_one.backend='django.contrib.auth.backends.ModelBackend'
        login(request)
        return "login_success"
    else:
        user=User.objects.create_user(username=username,email=email,password=settings.SECRET_KEY)
        user_one=User.objects.get(username=username)
        user_one.backend='django.contrib.auth.backends.ModelBackend'
        login(request)
        return "login_success"