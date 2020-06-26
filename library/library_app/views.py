# from django.shortcuts import render
from user.views import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Book, Borrowing
from .serializers import BookSerializer
from .utils import create_borrowing


class BookView(APIView):
    permission_classes=[AllowAny, ]

    def get(self, request):
        book_id = int(request.data['book_id'])
        book = Book.objects.get(pk=book_id)
        resp = {'content': BookSerializer(book).data}
        return Response(resp)

    def post(self, request):
        title = request.data['title']
        author = request.data['author']
        release_date = request.data['release_date']
        description = request.data['description']
        category = request.data['category']
        new_book = Book(title=title, author=author,
                        release_date=release_date, description=description,
                        category=category)
        new_book.save()
        return Response({'content': True})

class BorrowView(APIView):
    permission_classes=[IsAuthenticated, ]

    ''' borrow a book or extend returning date of borrowing '''
    def post(self, request):
        req_type = request.data['type']
        if req_type == 'borrow':
            title = request.data['title']
            author = request.data['author']
            book = Book.objects.filter(title=title, author=author, is_borrowed=False).first()
            if book is None:
                return Response({'content': 'Not available'})
            client_id = int(request.data['client_id'])
            client = User.objects.get(pk=client_id)
            create_borrowing(book=book, client=client)
            return Response({'content': True})

        elif req_type == 'extend_termin':
            book_id = int(request.data['book_id'])
            book = Book.objects.get(pk=book_id)
            client_id = int(request.data['client_id'])
            client = User.objects.get(pk=client_id)
            days_num = int(request.data['days_num'])

            try:
                borrowing = Borrowing.objects.get(book=book, client=client)
            except Borrowing.DoesNotExist:
                return Response({'Content': 'Borrowing does not exist'})
            
            borrowing.extend_returning_date(days_num)
            return Response({'content': True})
    
    ''' if book is available return True else False '''
    def get(self, request):
        title = request.data['title']
        author = request.data['author']
        book = Book.objects.filter(title=title, author=author, is_borrowed=False).first()
        if book is None:
            return Response({'content': False})
        else:
            return Response({'content': True})