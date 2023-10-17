from django import forms
from datetime import datetime as dt
from .models import Entradas, Saidas, MyUser

class FormNovoRegistro(forms.Form):
    categoria = forms.CharField()
    typeRegistro = forms.CharField()
    data = forms.DateField(required=False)
    valor = forms.FloatField(required=False)
    descricao = forms.CharField(required=False)

    def save(self, user:MyUser):
        categoria = self.cleaned_data['categoria']
        data = self.cleaned_data['data']
        valor = self.cleaned_data['valor']
        descricao = self.cleaned_data['descricao']
        typeRegistro = self.cleaned_data['typeRegistro']

        # validando os dados
        data = data if data != None else dt.today()
        valor = valor if valor != None else 0

        if typeRegistro == "entradas":
            model = Entradas
        elif typeRegistro == "saidas":
            model = Saidas

        model(user=user, categoria=categoria, data=data, valor=valor, descricao=descricao).save()