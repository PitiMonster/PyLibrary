# Generated by Django 3.0.6 on 2020-06-27 11:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library_app', '0005_auto_20200627_1233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrowing',
            name='borrowing_date',
            field=models.DateField(default=datetime.datetime(2020, 6, 27, 13, 11, 30, 227031)),
        ),
        migrations.AlterField(
            model_name='borrowing',
            name='returning_date',
            field=models.DateField(default=datetime.datetime(2020, 7, 18, 13, 11, 30, 227031)),
        ),
    ]
