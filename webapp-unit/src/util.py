from typing import Sequence
from datetime import datetime as dt

class Util(object):
    def dict_to_json_str(obj:dict|Sequence[dict]) -> str:
        if type(obj) not in (list, tuple, dict):
            return None
        
        if type(obj) == dict:
            return str(obj).replace("'",'"').replace('None','""')

        r = "["
        for i in obj:
            r += str(i).replace("'",'"') + ','
        
        # removendo última vírgula e alterando None para ""
        r = r[:-1].replace('None','""') + "]"
        return r
    
    def getModelValues(model, request=None, limit=None, order_by_last=False, reverse=False, **kwargs):
        if request:
            limit = request.get('limit')
            order_by_last = request.get('order_by_last')
            reverse = request.get('reverse')

        count = model.objects.count()
        limit = count if not limit else limit

        limit = int(limit)

        # verificando se a quantidade de dados é suficiente para o limit, caso não, todos serão retornados
        if limit >= count:
            values = model.objects.all()
        else:
            if order_by_last:
                values = model.objects.all()[count-limit:]
            else:
                values = model.objects.all()[:limit]

        if reverse:
            values = reversed(values)

        return values
    
    def formatdate(dateObj) -> str | None:
        if dateObj == None:
            return None
        return dt.strftime(dateObj, "%d/%m/%Y")