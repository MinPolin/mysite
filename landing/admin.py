from django.contrib import admin
from landing.models import Subscriber

class SubscriberAdmin(admin.ModelAdmin):
	list_display=["name","email"]
	search_fields=[field.name for field in Subscriber._meta.fields]


	class Meta:
		model=Subscriber
		

admin.site.register(Subscriber,SubscriberAdmin)
# Register your models here.
