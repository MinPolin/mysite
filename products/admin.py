from django.contrib import admin
from products.models import Product,ProductImg,Variable,Color,Size,Category


class ProductImgInline(admin.TabularInline):
	model=ProductImg
	extra=0
class VariableInline(admin.TabularInline):
	model=Variable
	extra=0
# class ColorInline(admin.TabularInline):
# 	model=Color
# 	extra=0

 
class ProductAdmin(admin.ModelAdmin):
	list_display=['id','name','price']
	search_fields=[field.name for field in Product._meta.fields]
	inlines =[VariableInline,ProductImgInline]

	class Meta:
		model=Product
		
class ColorAdmin(admin.ModelAdmin):
	list_display=[field.name for field in Color._meta.fields]
	search_fields=[field.name for field in Color._meta.fields]
	inlines =[VariableInline,ProductImgInline]

	class Meta:
		model=Color
class SizeAdmin(admin.ModelAdmin):
	list_display=[field.name for field in Size._meta.fields]
	search_fields=[field.name for field in Size._meta.fields]
	

	class Meta:
		model=Size
class VariableAdmin(admin.ModelAdmin):
	list_display=[field.name for field in Variable._meta.fields]
	search_fields=[field.name for field in Variable._meta.fields]
	

	class Meta:
		model=Variable
		


admin.site.register(Product,ProductAdmin)
admin.site.register(Color,ColorAdmin)
admin.site.register(ProductImg)
admin.site.register(Variable,VariableAdmin)
admin.site.register(Category)
admin.site.register(Size,SizeAdmin)