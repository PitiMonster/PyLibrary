from django.contrib import admin
from .models import User, Book, Borrowing

admin.site.register(User)
admin.site.register(Book)
admin.site.register(Borrowing)


# Register your models here.
