import { Link } from 'react-router-dom';
import type { Book } from '../types/Book';

// CartPage.tsx
// This component displays the user's shopping cart.
// It shows selected books, quantities, and total price.

type CartItem = Book & { quantity: number };

type CartPageProps = {
  cart: CartItem[];
};

function CartPage({ cart }: CartPageProps) {
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-dark fw-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
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

          <h4 className="mt-3">Total: ${cartTotal.toFixed(2)}</h4>

          <Link to="/" className="btn btn-secondary mt-3">
            Continue Shopping
          </Link>
        </>
      )}
    </div>
  );
}

export default CartPage;
