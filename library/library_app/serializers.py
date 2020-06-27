from rest_framework import serializers
from .models import Book, Borrowing

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'release_date', 'description', 'category']

class BorrowingSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    class Meta: 
        model = Borrowing
        fields = ['book', 'id', 'borrowing_date', 'returning_date']

