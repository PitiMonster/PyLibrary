# Generated by Django 3.0.6 on 2020-06-27 10:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library_app', '0003_auto_20200627_1201'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='author',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='book',
            name='category',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='book',
            name='title',
            field=models.CharField(max_length=75),
        ),
        migrations.AlterField(
            model_name='borrowing',
            name='borrowing_date',
            field=models.DateField(default=datetime.datetime(2020, 6, 27, 12, 11, 9, 164337)),
        ),
        migrations.AlterField(
            model_name='borrowing',
            name='returning_date',
            field=models.DateField(default=datetime.datetime(2020, 7, 18, 12, 11, 9, 164337)),
        ),
    ]