# Generated by Django 3.0.1 on 2020-02-19 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0012_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='adress',
            field=models.CharField(default=None, max_length=40),
        ),
        migrations.AlterField(
            model_name='order',
            name='session_id',
            field=models.CharField(blank=True, default=None, max_length=40),
        ),
    ]