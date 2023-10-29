from django.shortcuts import render
### These are just notes I took while programing my files ###
# my dict = {} abilty to just pass in self made dict as third agurment
# each block content is unique to its html file
def feed(request):

    return render(request,'feed/feed.html',{"name": "test"})

def index(request):
    ls = '1'
    return render(request,'feed/base.html',{"name": ls})

