from django.shortcuts import render

# Create your views here.

def dmchat(request):
    return render(request, 'chat/dmchat.html')