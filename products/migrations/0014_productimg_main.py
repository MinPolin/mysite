# Generated by Django 3.0.1 on 2020-02-05 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0013_auto_20200205_1739'),
    ]

    operations = [
        migrations.AddField(
            model_name='productimg',
            name='main',
            field=models.BooleanField(default=False),
        ),
    ]
