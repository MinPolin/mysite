from django.shortcuts import render
from products.models import Category, Variable, Size, ProductImg
from .models import Order
import json
from django.http import JsonResponse

# from http import cookies

# from orders.models import models


def cart(req):
    cart = []
    iids = {}
    all_img = []

    # cokid={}

    flag = True
    cookie = req.COOKIES
    try:
        variable = cookie['variable']
    except KeyError:
        flag = False
    else:
        variable = json.loads(variable)
        if len(variable):
            for k, v in variable.items():
                iids_put = {}
                size = Size.objects.get(name=v['size'])
                cart_item = Variable.objects.get(
                    colors=v['color_id'], prods=v['prod_id'], size=size)
                sw = 1
                img_item = ProductImg.objects.get(
                    colors=v['color_id'], prods=v['prod_id'], main=True)
                for img in all_img:
                    if img == img_item:
                        sw = 0
                if sw:
                    all_img.append(img_item)

                cart.append(cart_item)

                iids_put['ind'] = k

                iids_put['amount'] = v['amount']
                iids_put['price'] = cart_item.prods.price
                # iids_put['in_db']=cart_item.quantity
                iids[cart_item.id] = iids_put
    iids = json.dumps(iids)
    # cokid=json.dumps(cokid)

    return render(req, 'cart/cart.html', locals())


def order(req):

    cart = []
    all_img = []
    cookie = req.COOKIES
    checked = cookie['checked']
    checked = json.loads(checked)
    tot_price =0

    if (len(checked)):
        flag = True
        for k, v in checked.items():

            cart_item = Variable.objects.get(
                id=v['prod_id'])
            tot_price+=float(v['tot_price'])
            sw = 1
            img_item = ProductImg.objects.get(
                prods=cart_item.prods, colors=cart_item.colors, main=True)
            for img in all_img:
                if img == img_item:
                    sw = 0
            if sw:
                all_img.append(img_item)

            cart.append(cart_item)

    return render(req, 'order/order.html', locals())


def addToCart(req):
    ret_dict = dict()
    prod =[]
    session_key = req.session.session_key
    cookie = req.COOKIES
    checked = cookie['checked']
    checked = json.loads(checked)
    for k, v in checked.items():
        prod_item = Variable.objects.get(
                id=v['prod_id'])
        prod.append(prod_item)
        
            


    data = req.POST
    new =Order(session_id =session_key,name =data['name'],secondname =data['sername'],phone=data['phone'],email=data['email'],adress = data['adress'])
    new.save()
    new.prods.set(prod)

    return JsonResponse(ret_dict)


# Create your views here.
