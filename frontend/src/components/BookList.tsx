import type { Book } from '../types/Book';

// This component displays a list of books in a Bootstrap-styled table.
// It receives book data as props and renders each book as a row.
// It also includes an "Add to Cart" button for each book.

type BookListProps = {
  books: Book[];
  addToCart: (book: Book) => void;
};

function BookList({ books, addToCart }: BookListProps) {
  return (
    <div className="table-responsive">
      <table className="table table-sm table-striped table-bordered align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Class.</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
            <th>Cart</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.bookId}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => addToCart(b)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
