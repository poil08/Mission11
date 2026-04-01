import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import type { Book } from './types/Book';
import BookList from './components/BookList';
import CartPage from './components/CartPage';
import { fetchBooks } from './api/BooksAPI';
import AdminBookPage from './components/AdminBookPage';

// This is the main application component.
// It manages global state such as books, pagination, filtering, and the shopping cart.
// It also handles routing between the home page, cart page, and admin page,
// and integrates Bootstrap components like cards, grid layout, and modal.

function AppContent() {
  const navigate = useNavigate();

  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNum, setPageNum] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<(Book & { quantity: number })[]>([]);

  useEffect(() => {
    fetchBooks(pageSize, pageNum, sortBy, selectedCategory)
      .then((data) => {
        setBooks(data.books);
        setTotalBooks(data.totalNumBooks);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, [pageNum, pageSize, sortBy, selectedCategory]);

  useEffect(() => {
    setPageNum(1);
  }, [selectedCategory]);

  useEffect(() => {
    const savedCart = sessionStorage.getItem('cart');

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.bookId === book.bookId);

      if (existingBook) {
        return prevCart.map((item) =>
          item.bookId === book.bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const totalPages = Math.ceil(totalBooks / pageSize);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleGoToCartFromModal = () => {
    const modalElement = document.getElementById('cartModal');

    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.setAttribute('style', 'display: none;');
    }

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');
    document.body.style.removeProperty('overflow');

    navigate('/cart');
  };

  const homePage = (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-dark fw-bold">Bookstore</h1>

      <div className="d-flex justify-content-center gap-2 mb-4">
        <Link to="/adminbooks" className="btn btn-outline-dark">
          Admin Book Page
        </Link>

        <Link to="/cart" className="btn btn-outline-primary">
          Go to Cart
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-9">
          <div className="row mb-3 g-3">
            <div className="col-md-4">
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

            <div className="col-md-4">
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

            <div className="col-md-4">
              <label className="form-label fw-bold">Filter by Category</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPageNum(1);
                }}
              >
                <option value="All">All</option>
                <option value="Classic">Classic</option>
                <option value="Biography">Biography</option>
                <option value="Historical">Historical</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Business">Business</option>
                <option value="Thrillers">Thrillers</option>
                <option value="Christian Books">Christian Books</option>
                <option value="Health">Health</option>
                <option value="Action">Action</option>
              </select>
            </div>
          </div>

          <BookList books={books} addToCart={addToCart} />

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
              disabled={pageNum === totalPages || totalPages === 0}
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

        <div className="col-lg-3">
          <div className="sticky-top" style={{ top: '20px' }}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title mb-3">Cart Summary</h4>

                <p className="mb-2">
                  <strong>Total Items:</strong> {cartItemCount}
                </p>

                <p className="mb-3">
                  <strong>Total Price:</strong> ${cartTotal.toFixed(2)}
                </p>

                <div className="d-grid gap-2 mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                  >
                    View Cart
                  </button>

                  <Link to="/cart" className="btn btn-outline-primary">
                    Go to Cart
                  </Link>

                  <Link to="/adminbooks" className="btn btn-outline-dark">
                    Admin Page
                  </Link>
                </div>

                {cart.length === 0 ? (
                  <p className="text-muted mb-0">Your cart is empty.</p>
                ) : (
                  <ul className="list-group">
                    {cart.map((item) => (
                      <li
                        key={item.bookId}
                        className="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div>
                          <div className="fw-bold">{item.title}</div>
                          <small>Qty: {item.quantity}</small>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="cartModal"
        tabIndex={-1}
        aria-labelledby="cartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cartModalLabel">
                Shopping Cart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.bookId}>
                          <td>{item.title}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <div className="me-auto fw-bold">
                Total: ${cartTotal.toFixed(2)}
              </div>

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Continue Shopping
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGoToCartFromModal}
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={homePage} />
      <Route path="/cart" element={<CartPage cart={cart} />} />
      <Route path="/adminbooks" element={<AdminBookPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
