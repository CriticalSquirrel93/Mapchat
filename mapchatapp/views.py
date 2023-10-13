from django.shortcuts import render
import pyrebase

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