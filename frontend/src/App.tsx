import { useEffect, useState } from 'react';
import type { Book } from './types/Book';
import BookList from './components/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';

// This is the main application component.
// It handles fetching book data from the backend API,
// manages pagination, sorting, and page size state,
// and passes the data to the BookList component for display.

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetch(
      `http://localhost:5106/Books?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
        setTotalBooks(data.totalNumBooks);
      });
  }, [pageNum, pageSize, sortBy]);

  const totalPages = Math.ceil(totalBooks / pageSize);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Bookstore</h1>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label fw-bold">Results Per Page</label>
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Sort By</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="">Default</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      <BookList books={books} />

      <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPageNum(pageNum - 1)}
          disabled={pageNum === 1}
        >
          Previous
        </button>

        <span className="fw-bold">Page {pageNum}</span>

        <button
          className="btn btn-outline-primary"
          onClick={() => setPageNum(pageNum + 1)}
          disabled={pageNum === totalPages}
        >
          Next
        </button>
      </div>

      <div className="d-flex justify-content-center gap-2 mt-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn ${pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPageNum(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
