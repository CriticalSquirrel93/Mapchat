from django.shortcuts import render

# Create your views here.

#def chat(request):
    #return render(request, 'chat/chat.html')

def index(request):
    return render(request, "chat/index.html")


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})

