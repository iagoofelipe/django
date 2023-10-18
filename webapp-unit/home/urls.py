from django.urls import path

# from .views import HomeView
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('form_new_registro', views.form_new_registro, name='form_new_registro'),
    path('tabRegValues', views.tabRegValues, name='tabRegValues'),
    path('regCardValues', views.regCardValues, name='regCardValues'),
]

# view = HomeView()
# urlpatterns = view.urlpatterns