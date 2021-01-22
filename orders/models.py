from django.db import models
from products.models import Variable
from django.db.models.signals import post_save


# class Status(models.Model):
#     name = models.CharField(max_length=30, blank=True, null=True, default=None)
#     created = models.DateTimeField(auto_now_add=True, auto_now=False)
#     updated = models.DateTimeField(auto_now_add=False, auto_now=True)
#     is_active = models.BooleanField(default=True)

#     def __str__(self):
#         return "Заказ %s" % self.name

#     class Meta:
#         verbose_name = "Статус заказа"
#         verbose_name_plural = "Статусы заказов"

class Order(models.Model):
    session_id=models.CharField(max_length=40,blank=True,default=None)
    name=models.CharField(max_length=20,default=None)
    secondname=models.CharField(max_length=20,default=None)
    fathname=models.CharField(max_length=20,blank=True, null=True,default=None)
    phone =models.CharField(max_length=20,default=None)
    email = models.EmailField(max_length=20,default=None)
    adress=models.CharField(max_length=40,default=None)
    comm =models.TextField(max_length=250,blank=True, null=True,default=None)
    prods =models.ManyToManyField(Variable, blank=True, default=None, related_name='prod')

    def __str__(self):
        return "Заказ %s" % self.id

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"





    # def save(self, *args, **kwargs):

    #     super(Order, self).save(*args, **kwargs)


# class ProductInOrder(models.Model):
#     is_active = models.BooleanField(default=True)
#     order = models.ForeignKey(
#         Order, on_delete=models.CASCADE, blank=True, null=True, default=None)
#     product = models.ForeignKey(
#         Product, on_delete=models.CASCADE, blank=True, null=True, default=None)
#     nmb = models.IntegerField(default=1)
#     price_per_item = models.DecimalField(
#         max_digits=10, decimal_places=2, default=0)
#     total_price = models.DecimalField(
#         max_digits=10, decimal_places=2, default=0)
#     created = models.DateTimeField(auto_now_add=True, auto_now=False)
#     updated = models.DateTimeField(auto_now_add=False, auto_now=True)

#     def __str__(self):
#         return self.product.name

#     class Meta:
#         verbose_name = "Товар в заказе"
#         verbose_name_plural = "Товары в заказе"

#     def save(self, *args, **kwargs):

#         price_per_item = self.product.price
#         self.price_per_item = price_per_item

#         total_price = self.nmb * price_per_item
#         self.total_price = total_price

#         super(ProductInOrder, self).save(*args, **kwargs)


# def pio_post(sender, instance, created, **kwargs):
#     order = instance.order
#     order_total_price = 0
#     all_products_in_order = ProductInOrder.objects.filter(
#         order=order, is_active=True)
#     for item in all_products_in_order:
#         order_total_price += item.total_price

#     instance.order.total_price = order_total_price
#     instance.order.save(force_update=True)


# post_save.connect(pio_post, sender=ProductInOrder)


# Create your models here.
