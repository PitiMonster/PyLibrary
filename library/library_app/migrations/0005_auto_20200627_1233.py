# Generated by Django 3.0.6 on 2020-06-27 10:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library_app', '0004_auto_20200627_1211'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='is_borrowed',
        ),
        migrations.AddField(
            model_name='book',
            name='available',
            field=models.DecimalField(decimal_places=0, default=100, max_digits=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='book',
            name='borrowed',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=5),
        ),
        migrations.AlterField(
            model_name='borrowing',
            name='borrowing_date',
            field=models.DateField(default=datetime.datetime(2020, 6, 27, 12, 33, 30, 549215)),
        ),
        migrations.AlterField(
            model_name='borrowing',
            name='returning_date',
            field=models.DateField(default=datetime.datetime(2020, 7, 18, 12, 33, 30, 549215)),
        ),
    ]