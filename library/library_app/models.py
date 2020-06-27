from django.db import models
from django.dispatch import receiver
from allauth.account.signals import user_signed_up
from user.models import User
from datetime import timedelta, datetime

# executes when new user signed up
# @receiver(user_signed_up)
# def after_user_signed_up(request, user, **kwargs):
#     pass

class Book(models.Model):
    title = models.CharField(max_length=75)
    author = models.CharField(max_length=50)
    release_date = models.DateField()
    description = models.TextField(max_length=500)
    # categories divided by commas
    category = models.CharField(max_length=100)
    available = models.DecimalField(max_digits=5, decimal_places=0)
    borrowed = models.DecimalField(max_digits=5, decimal_places=0, default=0) 

    

    def __str__(self):
        return f"\"{self.title}\" by {self.author}."

class Borrowing(models.Model):
    date = datetime.now()

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    borrowing_date = models.DateField(default=date)
    returning_date = models.DateField(default=date+timedelta(weeks=3))

    def __str__(self):
        return f"Client: {self.client} has borrowed book: {self.book} to {self.returning_date}"

    def extend_returning_date(self, days_num: int):
        self.returning_date += timedelta(days=days_num)
        self.save()
        return