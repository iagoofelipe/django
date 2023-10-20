from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import path
from django.core.exceptions import ObjectDoesNotExist

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
        if not pk:
            return HttpResponse('{"error"}:"MissingPrimaryKey"')
        else:
            pk = int(pk)

        try:
            user = MyUser.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse('{"error":"DoesNotExist"}')

        r = dict(
            cargo=user.cargo, fullname=user.fullname, 
            username=user.username, nascimento=user.nascimento, cpf=user.cpf,
            email=user.email, telefone=user.telefone, acesso=user.acesso.nome,
        )
        
        return HttpResponse(Util.dict_to_json_str(r))

    def cadastrados(request):
        if not request.user.is_authenticated:
            return redirect('/login/')
        
        # limit = request.GET.get('limit')
        # reverse = bool(request.GET.get('reverse'))
        # order_by_last = bool(request.GET.get('order_by_last'))
        # if limit:
        #     limit = int(limit)
        
        # r = __class__.getCadastrados(limit=limit, reverse=reverse, order_by_last=order_by_last)
        r = __class__.getCadastrados(request=request.GET)
        return HttpResponse(Util.dict_to_json_str(r))
    
urlpatterns = [
    path('acessos/cadastrados', Acessos.cadastrados, name='cadastrados'),
    path('acessos/cadastrado', Acessos.cadastrado, name='cadastrado'),
]