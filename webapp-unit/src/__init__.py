from django.core.exceptions import PermissionDenied
from home.models import MyUser

def checkUserAccess(request, access_permited):
    """ verifica se o usuário possui permissão para a requisição """
    user = MyUser.objects.filter(username=request.user.username).first()
    if user.acesso.nome == access_permited:
        return True
    raise PermissionDenied()

from .util import Util