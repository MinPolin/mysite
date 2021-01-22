# Generated by Django 3.0.1 on 2020-02-05 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0015_auto_20200205_1809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='colors',
            field=models.ManyToManyField(blank=True, default=None, related_name='color', to='products.Color'),
        ),
        migrations.AlterField(
            model_name='variable',
            name='size',
            field=models.ManyToManyField(blank=True, default=None, related_name='variable', to='products.Size'),
        ),
    ]