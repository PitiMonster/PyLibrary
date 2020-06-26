from .models import Book, Borrowing, User

def create_borrowing(book: Book, client: User):
    try:
        new_bor = Borrowing(book=book, client=client)
        book.is_borrowed = True
        book.save()
        new_bor.save()
        return True
    except:
        return False