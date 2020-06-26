from . import views
from django.urls import path, re_path, include

urlpatterns=[
    re_path(r'book/$', views.BookView.as_view()),
    re_path(r'borrow/$', views.BorrowView.as_view()),
]