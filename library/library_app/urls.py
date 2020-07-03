from . import views
from django.urls import path, re_path, include

urlpatterns=[
    re_path(r'book/((?P<book_id>\d+)|all)/', views.BookView.as_view()),
    re_path(r'book/$', views.BookView.as_view()),
    re_path(r'borrow/$', views.BorrowView.as_view()),
    re_path(r'return/$', views.ReturnView.as_view()),
    re_path(r'search/(?P<type>(all|title|author))/(?P<key>.*)/$', views.SearchView.as_view()),
    re_path(r'borrowing/((?P<borrowing_id>\d+)|all)/', views.BorrowedBooksView.as_view()),

]