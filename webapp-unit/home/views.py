from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import MyUser, Acessos
from src import checkUserAccess

@login_required(login_url='/login/')
def index(request):
    user = User.objects.filter(username=request.user).first()
    usuario = MyUser.objects.filter(username=user).first()
    
    if usuario:
        fullname = usuario.fullname.split(' ')[0].title()
        cargo = usuario.cargo
    else:
        fullname = 'Usuário'
        cargo = 'cargo'

    usuarios = list(map(lambda i: {'fullname':i.fullname, 'cargo':i.cargo, 'acesso':i.acesso.nome}, MyUser.objects.all()))
    acessos = set(map(lambda i: i.nome, Acessos.objects.all())) # retorna valores únicos de acessos

    return render(request, 'home.html', {'user':fullname, 'cargo':cargo, 'acessos':acessos, 'usuarios':usuarios, 'tableHeader':('nome completo', 'cargo', 'nível de acesso')})

@login_required(login_url='/login/')
def users(request):
    """ utilizado como método POST, retorna Array (lista) """

    checkUserAccess(request, 'full')

    dados = []
    for i in MyUser.objects.all():
        dados.append({'fullname':i.fullname, 'cargo':i.cargo, 'acesso':i.acesso.nome})
    
    print("dados:", dados)
    print(request.user.username)