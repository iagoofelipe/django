from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import MyUser, Acessos, Entradas, Saidas
from src import checkUserAccess
from django.urls import path

from .forms import FormNovoRegistro

from src.Acessos import AcessosModel, urlpatterns as url_acessos
from src.Registros import Registros, urlpatterns as url_registros

class HomeView(object):
    def index(request):
        if not request.user.is_authenticated:
            return redirect('/login/')

        user = User.objects.filter(username=request.user).first()
        usuario = MyUser.objects.filter(username=user).first()
        
        if usuario:
            fullname = usuario.fullname.split(' ')[0].title()
            cargo = usuario.cargo
        else:
            fullname = 'Usuário'
            cargo = 'cargo'

        acessos = set(map(lambda i: i.nome, AcessosModel.objects.all()))
        values = Registros.card_values()
        return render(request, 'home.html', {'user':fullname, 'cargo':cargo, 'acessos':acessos, 'values':values})


# @login_required(login_url='/login/')
# def tabRegValues(request):
#     _type = request.GET.get('type')

#     if _type == 'entradas':
#         model = Entradas
#     elif _type == "saidas":
#         model = Saidas
#     else:
#         return HttpResponse("UnknownType")
    
#     num_popu = model.objects.count()
#     try:
#         values = model.objects.all()[num_popu-10:num_popu]
#     except ValueError:
#         values = model.objects.all()[:10]

#     value = '['
#     for row in values:
#         data = row.data.strftime('%d/%m/%Y')
#         value += '{"id":'+str(row.pk)+', "categoria":"'+row.categoria+'", "data":"'+data+'", "valor":'+str(row.valor)+', "descricao":"'+row.descricao+'"},'

#     # ignorando última vírugla
#     value = value[:-1]
#     value += ']'
#     '[{"key":"content"}, {"key":"content"}]'
#     return HttpResponse(value)

# @login_required(login_url='/login/')
# def regCardValues(request):
#     values = str(_regCardValues()).replace("'",'"')
    # return HttpResponse(values)

# def _regCardValues():
#     total_entradas, total_saidas = 0, 0
#     contagem_entradas = Entradas.objects.count()
#     contagem_saidas = Saidas.objects.count()

#     for i in Entradas.objects.all():
#         total_entradas += i.valor

#     for i in Saidas.objects.all():
#         total_saidas += i.valor

#     values = {
#         'contagem_entradas':contagem_entradas, 
#         'contagem_saidas':contagem_saidas, 
#         'total_entradas':float(total_entradas), 
#         'total_saidas':float(total_saidas),
#         'total': float(total_entradas + total_saidas),
#     }

#     return values


urlpatterns = url_acessos + url_registros + [
        path('', HomeView.index, name='index')
    ]