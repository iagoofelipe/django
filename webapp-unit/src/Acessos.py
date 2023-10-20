from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import path
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime as dt

from home.models import MyUser, Acessos as AcessosModel, Entradas, Saidas
from home.forms import FormNovoRegistro
from .util import Util

class Acessos(object):
    def getCadastrados(**kwargs):        
        values = Util.getModelValues(MyUser, **kwargs)
        r = []
        for user in values:
            r.append(dict(id=user.pk, cargo=user.cargo, fullname=user.fullname, username=user.username, acesso=user.acesso.nome, email=user.email))
        return r
    
    def cadastrado(request):
        if not request.user.is_authenticated:
            return redirect('/login/')
        
        pk = request.GET.get('id')
        dateformat = request.GET.get('dateformat')

        try:
            dt.strftime(dt.now(), dateformat)
        except:
            dateformat = "%d/%m/%Y"

        if not pk:
            return HttpResponse('{"error"}:"MissingPrimaryKey"')
        else:
            pk = int(pk)

        try:
            user = MyUser.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse('{"error":"DoesNotExist"}')

        nascimento = dt.strftime(user.nascimento, dateformat) if user.nascimento else None

        r = dict(
            cargo=user.cargo, fullname=user.fullname, 
            username=user.username, nascimento=nascimento, cpf=user.cpf,
            email=user.email, telefone=user.telefone, acesso=user.acesso.nome,
        )
        
        return HttpResponse(Util.dict_to_json_str(r))

    def cadastrados(request):
        if not request.user.is_authenticated:
            return redirect('/login/')
        
        r = __class__.getCadastrados(request=request.GET)
        return HttpResponse(Util.dict_to_json_str(r))
    
    def editar_usuario(request):
        print(request.POST)
        return HttpResponse('usuário editado com sucesso!')
        # return HttpResponse('usuário')
    
urlpatterns = [
    path('acessos/cadastrados', Acessos.cadastrados, name='cadastrados'),
    path('acessos/cadastrado', Acessos.cadastrado, name='cadastrado'),
    path('acessos/editar_usuario', Acessos.editar_usuario, name='editar_usuario'),
]