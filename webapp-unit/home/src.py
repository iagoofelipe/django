from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import path


from .models import MyUser, Acessos as AcessosModel, Entradas, Saidas
from .forms import FormNovoRegistro





            




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
    
    # def cadastrados(request):
    #     if not request.user.is_authenticated:
    #         return redirect('/login/')
        
    #     limit = request.GET.get('limit')
    #     reverse = bool(request.GET.get('reverse'))
    #     order_by_last = bool(request.GET.get('order_by_last'))
    #     if limit:
    #         limit = int(limit)
        
    #     r = Acessos.cadastrados(limit=limit, reverse=reverse, order_by_last=order_by_last)
    #     return HttpResponse(Util.dict_to_json_str(r))
    

    # def form_new_registro(request):
    #     if not request.user.is_authenticated:
    #         return redirect('/login/')
        
    #     if request.method != "POST":
    #         return HttpResponse('null')
        
    #     form = FormNovoRegistro(request.POST)
    #     if not form.is_valid():
    #         return HttpResponse('missingData')
        
    #     user = User.objects.filter(username=request.user).first()
    #     usuario = MyUser.objects.filter(username=user).first()

    #     form.save(usuario)
    #     return HttpResponse('200')


# urlpatterns = [
#     path('', HomeView.index, name='index'),
#     path('registros/novo_registro', Registros.novo_registro, name='novo_registro'),
#     path('acessos/cadastrados', Acessos.cadastrados, name='cadastrados')
# ]