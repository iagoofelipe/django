from typing import Any
from django.db import models
from django.contrib.auth.models import User

class Acessos(models.Model):
    nome = models.CharField(max_length=30)

# class Pessoa(models.Model):
#     nome = models.CharField(max_length=100)
#     nascimento = models.DateField(null=True)
#     cpf = models.IntegerField(null=True)
#     email = models.CharField(max_length=30, null=True)
#     telefone = models.IntegerField(null=True)

class Responsavel(models.Model):
    nome = models.CharField(max_length=100)
    nascimento = models.DateField(null=True)
    cpf = models.IntegerField(null=True)
    email = models.CharField(max_length=30, null=True)
    telefone = models.IntegerField(null=True)
    

class Estudante(models.Model):
    responsavel = models.ForeignKey(Responsavel, on_delete=models.SET_NULL, null=True)

    nome = models.CharField(max_length=100)
    nascimento = models.DateField(null=True)
    cpf = models.IntegerField(null=True)
    email = models.CharField(max_length=30, null=True)
    telefone = models.IntegerField(null=True)


class MyUser(models.Model):
    acesso = models.ForeignKey(Acessos, on_delete=models.SET_NULL, null=True)
    cargo = models.CharField(max_length=100)
    fullname = models.CharField(max_length=100)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=100)

    
    nascimento = models.DateField(null=True)
    cpf = models.IntegerField(null=True)
    email = models.CharField(max_length=30, null=True)
    telefone = models.IntegerField(null=True)


class Professor(models.Model):
    disciplina = models.CharField(max_length=30)
    turmas = models.ForeignKey(Responsavel, on_delete=models.SET_NULL, null=True)

    nome = models.CharField(max_length=100)
    nascimento = models.DateField(null=True)
    cpf = models.IntegerField(null=True)
    email = models.CharField(max_length=30, null=True)
    telefone = models.IntegerField(null=True)


class Turma(models.Model):
    professor = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True)
    nome = models.CharField(max_length=30)
    alunos = models.ForeignKey(Estudante, on_delete=models.SET_NULL, null=True)

class Entradas(models.Model):
    categoria = models.CharField(max_length=100)
    data = models.DateField(auto_now=True)
    valor = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    descricao = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)

class Saidas(models.Model):
    categoria = models.CharField(max_length=100)
    data = models.DateField(auto_now=True)
    valor = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    descricao = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)