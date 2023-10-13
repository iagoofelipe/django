from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout as logout_django, login as login_django
from django.contrib.auth.decorators import login_required
from home.models import MyUser, Acessos
from src import checkUserAccess

def cadastro(request):
    checkUserAccess(request, 'full')
    match request.POST.get('type'):
        case 'user':
            username = request.POST.get('username')
            if MyUser.objects.filter(username=username).first():
                return HttpResponse('usuário já cadastrado!')

            data = {}
            for key, value in request.POST.items():
                if value and key not in ('type', 'csrfmiddlewaretoken', 'acesso'):
                    data[key]=value

            User.objects.create_user(username=data['username'], email=request.POST.get('email'), password=data['password'])
            MyUser(acesso=Acessos.objects.filter(nome=request.POST.get('acesso')).first(), **data).save()

            return HttpResponse('usuário cadastrado com sucesso!', )
    return HttpResponse('null')

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