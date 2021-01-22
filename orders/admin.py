from django.contrib import admin
from .models import Order


class OrderAdmin(admin.ModelAdmin):
	list_display=[field.name for field in Order._meta.fields]
	search_fields=[field.name for field in Order._meta.fields]
	

	class Meta:
		model=Order
admin.site.register(Order)
# class PoductInOrderInline(admin.TabularInline):
# 	model=Variable
# 	extra=0

		



# # Register your models here.
