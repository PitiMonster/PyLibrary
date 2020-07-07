from .models import Book, Borrowing, User

def create_borrowing(book: Book, client: User):
    try:
        new_bor = Borrowing(book=book, client=client)
        book.available -= 1
        book.borrowed += 1
        book.save()
        new_bor.save()
        return True
    except Exception as e:
        print(e)
        return False


def delete_borrowing(borrowing: Borrowing):
    try:
        book = borrowing.book
        book.available += 1 
        book.borrowed -= 1 
        book.save() 
        borrowing.delete() 
        return True 
    except Exception as e: 
        print(e)
        return False