# Generated by Django 3.0.6 on 2020-07-02 09:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library_app', '0008_auto_20200702_1108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='borrowing',
            name='borrowing_date',
            field=models.DateField(default=datetime.datetime(2020, 7, 2, 11, 11, 40, 763687)),
        ),
        migrations.AlterField(
            model_name='borrowing',
            name='returning_date',
            field=models.DateField(default=datetime.datetime(2020, 7, 23, 11, 11, 40, 763687)),
        ),
    ]