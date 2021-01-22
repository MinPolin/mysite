# Generated by Django 3.0.1 on 2020-02-04 23:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_auto_20200204_1932'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='variable',
            options={'verbose_name': 'Размер', 'verbose_name_plural': 'Размеры'},
        ),
        migrations.RemoveField(
            model_name='variable',
            name='color',
        ),
        migrations.RemoveField(
            model_name='variable',
            name='products',
        ),
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, choices=[('RED', 'RED'), ('BLUE', 'BLUE'), ('GREEN', 'GREEN'), ('WHITE', 'WHITE')], default=None, max_length=20, null=True)),
                ('prods', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='variable', to='products.Product')),
            ],
            options={
                'verbose_name': 'цвет',
                'verbose_name_plural': 'цвета',
            },
        ),
        migrations.AddField(
            model_name='variable',
            name='colors',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='variable', to='products.Color'),
        ),
        migrations.AlterField(
            model_name='productimg',
            name='products',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='products.Color'),
        ),
    ]