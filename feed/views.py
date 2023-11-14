from django.shortcuts import render


### These are just notes I took while programing my files ###
# my dict = {} ability to just pass in self-made dict as third agurment
# each block content is unique to its html file
def feed(request):
    return render(request, 'homepage.html', {"name": "test"})
