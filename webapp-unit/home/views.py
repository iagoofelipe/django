from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import MyUser

@login_required(login_url='/login/')
def index(request):
    user = User.objects.filter(username=request.user).first()
    # return HttpResponse('Olá,'+' '.join(('',user.first_name, user.last_name)))
    usuario = MyUser.objects.filter(username=user).first()
    
    if usuario:
        fullname = ' '.join((usuario.fullname.split(' ')[0], usuario.fullname.split(' ')[-1]))
        cargo = usuario.cargo
    else:
        fullname = 'Usuário'
        cargo = 'cargo'

    return render(request, 'home.html', {'user':fullname, 'cargo':cargo})