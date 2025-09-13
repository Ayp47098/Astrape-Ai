import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();

  const calculateTotal = () => {
    return cart.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  if (cart.cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cart.cartItems.map((item) => (
            <div key={item.product._id} className="p-6 flex items-center">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      updateCartItemQuantity(
                        item.product._id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    className="btn btn-primary px-2 py-1"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item.product._id, item.quantity + 1)
                    }
                    className="btn btn-primary px-2 py-1"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
          </div>
          <button className="btn btn-primary w-full mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
