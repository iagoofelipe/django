from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.urls import path

from home.models import MyUser, Acessos as AcessosModel, Entradas, Saidas
from home.forms import FormNovoRegistro

from src.util import Util

class Registros(object):

    def _card_values() -> dict:
        total_entradas, total_saidas = 0, 0
        contagem_entradas = Entradas.objects.count()
        contagem_saidas = Saidas.objects.count()

        for i in Entradas.objects.all():
            total_entradas += i.valor

        for i in Saidas.objects.all():
            total_saidas += i.valor

        values = {
            'contagem_entradas':contagem_entradas, 
            'contagem_saidas':contagem_saidas, 
            'total_entradas':float(total_entradas), 
            'total_saidas':float(total_saidas),
            'total': float(total_entradas + total_saidas),
        }

        return values
    
    def card_values(request):
        if not request.user.is_authenticated:
            return redirect('/login/')
        return HttpResponse(Util.dict_to_json_str(__class__._card_values()))


    def novo_registro(request):
        if not request.user.is_authenticated:
            return redirect('/login/')
        
        if request.method != "POST":
            return HttpResponse('null')
        
        form = FormNovoRegistro(request.POST)
        if not form.is_valid():
            return HttpResponse('missingData')
        
        user = User.objects.filter(username=request.user).first()
        usuario = MyUser.objects.filter(username=user).first()

        form.save(usuario)
        return HttpResponse('200')


    def registros_salvos(request):
        if not request.user.is_authenticated:
            return redirect('/login/')
        
        _type = request.GET.get('type')
        limit = request.GET.get('limit')

        if _type == 'entradas':
            model = Entradas
        elif _type == "saidas":
            model = Saidas
        else:
            return HttpResponse("UnknownType")
        
        return HttpResponse(Util.dict_to_json_str(Util.getModelValues(model, limit=limit, order_by_last=True, reverse=True)))
        

    
urlpatterns = [
    path('registros/novo_registro', Registros.novo_registro, name='novo_registro'),
    path('registros/card_values', Registros.card_values, name='card_values'),
    path('registros/registros_salvos', Registros.registros_salvos, name='registros_salvos'),
]