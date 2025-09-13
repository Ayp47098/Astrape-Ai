import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              E-Commerce
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white">
              Products
            </Link>
            
            <Link to="/cart" className="text-gray-300 hover:text-white">
              Cart ({cart.cartItems.length})
            </Link>
            
            {user ? (
              <>
                <span className="text-gray-300">Hello, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
