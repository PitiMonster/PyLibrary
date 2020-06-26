# Generated by Django 3.0.6 on 2020-06-26 16:52

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(max_length=75)),
                ('author', models.TextField(max_length=50)),
                ('release_date', models.DateField()),
                ('description', models.TextField(max_length=500)),
                ('category', models.TextField(max_length=100)),
                ('is_borrowed', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Borrowing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('borrowing_date', models.DateField(default=datetime.datetime(2020, 6, 26, 18, 52, 35, 209282))),
                ('returning_date', models.DateField(default=datetime.datetime(2020, 7, 17, 18, 52, 35, 209282))),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library_app.Book')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
