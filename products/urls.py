from django.urls import path

from . import views

urlpatterns = [
    path('', views.products, name="prods"),
    path('filter/', views.filter, name="filter"),
    path('<int:productid>/', views.profile, name="product"),
    path('category/<int:catid>/', views.category),


]
