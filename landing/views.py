from django.shortcuts import render
from .forms import SubscriberForm
from products.models import Category

def landing(req):
    form = SubscriberForm(req.POST or None)
    a = "http://127.0.0.1:8000/home"
    if req.method == "POST":
        new_form = form.save()

    return render(req, 'landing/landing.html', locals())


def home(req):
    cats = Category.objects.all()
    session_key = req.session.session_key

    if not session_key:
        req.session.cycle_key()
        # session_key=req.session.session_key
    cur_user = req.user
    if cur_user.is_authenticated:
        user_letter = cur_user.get_username()[0]

    return render(req, 'landing/home.html', locals())



# Create your views here.
