from django.shortcuts import get_object_or_404
from user.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response


#own imports 
from .models import Book, Borrowing
from .serializers import BookSerializer, BorrowingSerializer
from .utils import create_borrowing, delete_borrowing


class BookView(APIView):
    permission_classes=[AllowAny, ]

    def get(self, request, book_id=0):
        if book_id == 0:
            books = Book.objects.all()
            resp = {'content': BookSerializer(books, many=True).data}
        else:
            book = get_object_or_404(Book, pk=book_id)
            resp = {'content': BookSerializer(book).data}
        return Response(resp)

    def post(self, request):
        title = request.data['title']
        author = request.data['author']
        release_date = request.data['release_date']
        description = request.data['description']
        category = request.data['category']
        available = int(request.data['available'])
        new_book = Book(title=title, author=author, 
                        release_date=release_date, description=description,
                        category=category, available=available)
        new_book.save()
        return Response({'content': True})

class BorrowView(APIView):
    permission_classes=[IsAuthenticated, ]

    def post(self, request):
        ''' borrow a book or extend returning date of borrowing '''
        req_type = request.data['type']
        if req_type == 'borrow':
            title = request.data['title']
            author = request.data['author']
            book = Book.objects.filter(title=title, author=author, available__gt=0).first()
            if book is None:
                return Response({'content': 'Not available'})
            client = request.user
            borrowed = Borrowing.objects.filter(book=book, client=client).first() 
            if borrowed is not None: 
                return Response({'content': 'Already borrowed'})
            create_borrowing(book=book, client=client)
            return Response({'content': True})

        elif req_type == 'extend_termin':
            book_id = int(request.data['book_id'])
            book = get_object_or_404(Book, pk=book_id)
            client = request.user
            days_num = int(request.data['days_num'])

            try:
                borrowing = Borrowing.objects.get(book=book, client=client)
            except Borrowing.DoesNotExist:
                return Response({'Content': 'Borrowing does not exist'})
            
            borrowing.extend_returning_date(days_num)
            return Response({'content': True})
    
    def get(self, request): 
        '''if book is available return True else False'''
        title = request.data['title']
        author = request.data['author']
        book = Book.objects.filter(title=title, author=author, available__gt=0).first()
        if book is None:
            return Response({'content': False})
        else:
            return Response({'content': True})



class ReturnView(APIView):
    permission_classes=[IsAuthenticated, ]

    def post(self, request):
        '''returning a borrowed book'''
        borrowing_id = int(request.data['borrowing_id'])
        try:
            borrowing = get_object_or_404(Borrowing, pk=borrowing_id)
            if borrowing.client == request.user and delete_borrowing(borrowing): 
                return Response({'content': True})
            else:
                return Response({'content': False})
        except Exception as e:
            print(e)
            return Response({'content': False})
        
class BorrowedBooksView(APIView):
    permission_classes=[IsAuthenticated, ]

    def get(self, request):
        ''' get all user's borrowed books'''
        user = request.user
        borrowings = Borrowing.objects.filter(client=user)
        resp = {'content' : BorrowingSerializer(borrowings, many=True).data}
        return Response(resp)
    

class SearchView(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        ''' search books in library '''
        type = request.data['type'] 
        key = request.data['key']
        if type == 'title':
            found_books = Book.objects.filter(title__icontains=key)
        elif type == 'author':
            found_books = Book.objects.filter(author__icontains=key) 
        resp = {'content' : BookSerializer(found_books, many=True).data}
        return Response(resp)
        