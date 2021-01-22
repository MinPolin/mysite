from django.db import models

class Product(models.Model):
    colors = models.ManyToManyField(
        'Color', blank=True, default=None, related_name='prod')
    category = models.ForeignKey('Category', on_delete=models.CASCADE,
                               blank=True, null=True, default=None, related_name='prod')
    price = models.IntegerField()
    fimage = models.ImageField(upload_to="media/product_images/")
    name = models.CharField(max_length=64, blank=True, null=True, default=None)
    description = models.TextField(blank=True, null=True, default=None)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"


class ProductImg(models.Model):
    colors = models.ForeignKey('Color', on_delete=models.CASCADE,
                               blank=True, null=True, default=None, related_name='img')
    prods = models.ForeignKey(Product, on_delete=models.CASCADE,
                                  blank=True, null=True, default=None, related_name='img')
    main=models.BooleanField(default=False)
    image = models.ImageField(upload_to="media/product_images/")
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    def __str__(self):
        return "%s" % self.id

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"


class Color(models.Model):

    name = models.CharField(max_length=20, blank=True, null=True, default=None)

    def __str__(self):
        return " %s" % (self.name)
 
    class Meta:
        verbose_name = "цвет"
        verbose_name_plural = "цвета"

class Category(models.Model):

    name = models.CharField(max_length=20, blank=True, null=True, default=None)
    fimage = models.ImageField(upload_to="media/category_images/")

    def __str__(self):
        return " %s" % (self.name)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

class Size(models.Model):

    name = models.CharField(max_length=4, blank=True, null=True, default=None)
    info=models.CharField(max_length=50, blank=True, null=True, default=None)

    def __str__(self):
        return " %s" % (self.name)

    class Meta:
        verbose_name = "размер"
        verbose_name_plural = "размеры"


class Variable(models.Model):
    

    colors = models.ForeignKey(Color, on_delete=models.CASCADE,
                               blank=True, null=True, default=None, related_name='variable')
    prods = models.ForeignKey(Product, on_delete=models.CASCADE,
                              blank=True, null=True, default=None, related_name='variable')

    size = models.ForeignKey(Size,blank=True, on_delete=models.CASCADE, default=None, related_name='variable')
    quantity = models.IntegerField()


    def __str__(self):
        return "%s %s %s " % (self.prods.name,self.colors.name,self.size)

    class Meta:
        verbose_name = "Все товары"
        verbose_name_plural = "Все товары"


# def noImg(sender, instance, created, **kwargs):
# 2 модели цвета и размеры. выбирать галочками
