import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import {
  createBook,
  deleteBook,
  fetchBooks,
  updateBook,
} from '../api/BooksAPI';
import BookForm from './BookForm';
import { Link } from 'react-router-dom';

function AdminBookPage() {
  const emptyBook: Book = {
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: '' as unknown as number,
    price: '' as unknown as number,
  };

  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const loadBooks = async () => {
    const data = await fetchBooks(1000, 1, '', 'All');
    setBooks(data.books);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (bookId: number) => {
    await deleteBook(bookId);
    loadBooks();
  };

  const handleSave = async (book: Book) => {
    if (book.bookId === 0) {
      await createBook(book);
    } else {
      await updateBook(book);
    }

    setEditingBook(null);
    loadBooks();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-dark fw-bold">
        Admin Book Management
      </h1>

      <div className="mb-3">
        <Link to="/" className="btn btn-secondary">
          ← Back to Bookstore
        </Link>
      </div>

      <BookForm
        book={editingBook ?? emptyBook}
        onSave={handleSave}
        onCancel={() => setEditingBook(null)}
      />

      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.bookId}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.category}</td>
                <td>${b.price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => setEditingBook(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(b.bookId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBookPage;
