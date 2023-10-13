# Generated by Django 4.2.6 on 2023-10-12 20:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Acessos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Estudante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('nascimento', models.DateField(null=True)),
                ('cpf', models.IntegerField(null=True)),
                ('email', models.CharField(max_length=30, null=True)),
                ('telefone', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Professor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('disciplina', models.CharField(max_length=30)),
                ('nome', models.CharField(max_length=100)),
                ('nascimento', models.DateField(null=True)),
                ('cpf', models.IntegerField(null=True)),
                ('email', models.CharField(max_length=30, null=True)),
                ('telefone', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Responsavel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('nascimento', models.DateField(null=True)),
                ('cpf', models.IntegerField(null=True)),
                ('email', models.CharField(max_length=30, null=True)),
                ('telefone', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Turma',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=30)),
                ('alunos', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.estudante')),
                ('professor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.professor')),
            ],
        ),
        migrations.AddField(
            model_name='professor',
            name='turmas',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.responsavel'),
        ),
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cargo', models.CharField(max_length=100)),
                ('fullname', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=255)),
                ('username', models.CharField(max_length=100)),
                ('nascimento', models.DateField(null=True)),
                ('cpf', models.IntegerField(null=True)),
                ('email', models.CharField(max_length=30, null=True)),
                ('telefone', models.IntegerField(null=True)),
                ('acesso', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.acessos')),
            ],
        ),
        migrations.AddField(
            model_name='estudante',
            name='responsavel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='home.responsavel'),
        ),
    ]