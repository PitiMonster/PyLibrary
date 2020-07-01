from . import views
from django.urls import path, re_path, include

urlpatterns=[
    re_path(r'book/(?P<book_id>\d+)|all/', views.BookView.as_view()),
    re_path(r'book/$', views.BookView.as_view()),
    re_path(r'borrow/$', views.BorrowView.as_view()),
    re_path(r'return/$', views.ReturnView.as_view()),
    re_path(r'borrowed/$', views.BorrowedBooksView.as_view()), #TODO: change it 
    re_path(r'search/$', views.SearchView.as_view()),
    re_path(r'borrowing/(?P<borrowing_id>\d+)/', views.BorrowedBooksView.as_view()),

]