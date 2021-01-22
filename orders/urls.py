from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.cart),
    path('order/', views.order,name='order'),
    path('addtocart/',views.addToCart, name ="addToCart")


   
]