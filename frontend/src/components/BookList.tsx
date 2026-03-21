import type { Book } from '../types/Book';

// This component is responsible for displaying a list of books.
// It receives book data as props and renders them in a Bootstrap-styled table.
// Each row represents one book from the database.

type BookListProps = {
  books: Book[];
};

function BookList({ books }: BookListProps) {
  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>ISBN</th>
          <th>Classification</th>
          <th>Category</th>
          <th>Number of Pages</th>
          <th>Price</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookList;
