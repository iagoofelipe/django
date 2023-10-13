from home.models import *
from django.contrib.auth.models import User

User.objects.create_user(username='jose', password='1234', email='jose@gmail.com', fullname='JOSÉ DA SILVA CARVALHO', acesso='full', cargo='Supervisor')
User.objects.create_superuser(username='iago', password='1234', email='iago@gmail.com', fullname='IAGO FELIPE DA SILVA CARVALHO', acesso='full', cargo='Supervisor')