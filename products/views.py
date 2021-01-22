from django.shortcuts import render
from .models import ProductImg, Product, Variable, Size, Color, Category
import json
from django.http import JsonResponse
from django.core.paginator import Paginator


def filter_go(data):
    var_prods = []
    new = []
    if data['category']:
        category = Category.objects.get(name=data['category'])
        var_prods = Product.objects.filter(is_active=True, category=category)

    else:
        var_prods = Product.objects.all()
    if data['color']:
        color = Color.objects.get(name=data['color'])
        for item in var_prods:
            if color in item.colors.all():
                new.append(item)
        var_prods = new
        new = []
    if data['size']:
        size = Size.objects.get(name=data['size'])
        for item in var_prods:
            variable = Variable.objects.filter(prods=item)
            flag = False
            for item2 in variable:
                if item2.size == size:
                    flag = True
            if flag:
                new.append(item)
        var_prods = new
    return var_prods


def products(req):

    cookie = req.COOKIES
    data = dict()
    try:
        filt = cookie['filter']
        filt = json.loads(filt)
    except KeyError:
        data['color']=""
        data['size']=""
        data['category']=""
    else:
        data['color']=filt['color']
        data['size']=filt['size']
        data['category']=filt['category']
        nothing = filt['nothing']
    # products = Product.objects.filter(is_active=True)
    colors = Color.objects.all()
    sizes = Size.objects.all()
    category = Category.objects.all()
    my_filter = [colors, sizes, category]
    products = filter_go(data)
    paginator = Paginator(products, 6)
    page_number = req.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(req, 'products.html', locals())


def filter(req):
    ret_dict = dict()

    data = req.POST
    ret_dict['color'] = data['color']
    ret_dict['size'] = data['size']
    ret_dict['category'] = data['category']

    var_prods = filter_go(data)
    i = 0
    for item in var_prods:
        it = dict()
        it['image'] = item.fimage.url
        it['name'] = item.name
        it['description'] = item.description[:49] + '...'
        it['id'] = item.id
        ret_dict[i] = it
        i += 1
    ret_dict['amount'] = i

    return JsonResponse(ret_dict)

def profile(req,productid):
    pr_id = productid
    product = Product.objects.get(id = productid)
    prod_colors = product.colors.all()
    sizes = Size.objects.all()
    prod_var= Variable.objects.filter(prods = product)
    prod_sizes = {}
    for clr in prod_colors:
        s={}
        i=0
        for size in sizes:
            if size.variable.filter(prods = product, colors  = clr):
                s[i] = (size.name)
                i+=1
        prod_sizes[clr.id]=s
    prod_sizes = json.dumps(prod_sizes)
    return render(req, 'profile.html', locals())



def category(req, catid):
    products = Product.objects.filter(category=catid)
    colors = Color.objects.all()
    sizes = Size.objects.all()
    category = Category.objects.all()
    my_filter = [colors, sizes, category]
    paginator = Paginator(products, 6)
    page_number = req.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(req, 'products.html', locals())

# Create your views here.
