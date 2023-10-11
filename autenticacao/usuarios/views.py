from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as login_django
from django.contrib.auth.decorators import login_required

def cadastro(request):
    if request.method == 'GET':
        return render(request, 'cadastro.html')
    else:
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = User.objects.filter(username=username).first() # verifica se o usuário já existe

        if user:
            return HttpResponse('já existe um usuário com esse username')
        
        User.objects.create_user(username=username, email=email, password=password)
        return HttpResponse('usuario cadastrado com sucesso')

def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)
        
        if user:
            login_django(request, user)
            return HttpResponse('autenticado')
        else:
            return HttpResponse('usuário ou senha inválidos')
        
@login_required(login_url='/auth/login/')
def plataforma(request):
    return HttpResponse('plataforma')