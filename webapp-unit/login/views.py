from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout as logout_django, login as login_django
from django.contrib.auth.decorators import login_required
from home.models import MyUser, Acessos

def cadastro(request):
    # if request.method == 'GET':
    #     return render(request, 'cadastro.html')
    # else:
        # username = request.POST.get('username')
        # email = request.POST.get('email')
        # password = request.POST.get('password')

        # user = User.objects.filter(username=username).first() # verifica se o usuário já existe

        # if user:
        #     return HttpResponse('já existe um usuário com esse username')
        
        # User.objects.create_user(username=username, email=email, password=password)

        Acessos(nome='full').save()
        acesso_full = Acessos.objects.filter(nome='full').first()
        
        # MyUser(acesso=acesso_full, cargo='Supervisor', fullname='JOSÉ DA SILVA CARVALHO', password='1234', username='jose').save()
        MyUser(acesso=acesso_full, cargo='Supervisor', username='iago', fullname='IAGO FELIPE DA SILVA CARVALHO', email='iago@gmail.com', password='1234').save()
        
        # User.objects.create_user('jose', 'jose@gmail.com', '1234')

        return HttpResponse('usuario cadastrado com sucesso')

def index(request):
    if str(request.user) == 'AnonymousUser':
        return render(request, 'login.html')
    else:
         return HttpResponseRedirect('/home/')

def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user:
        login_django(request, user)
        return HttpResponse('{"authorized":"true"}')
    else:
        return HttpResponse('{"authorized":"false"}')

def logout(request):
    logout_django(request)
    return HttpResponseRedirect('/login/')