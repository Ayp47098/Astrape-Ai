import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { cartItems: [] };
  });

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      if (token) {
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity }),
        });
        const data = await response.json();
        if (data.success) {
          setCart(data.data);
        }
      } else {
        // Handle local cart
        const updatedCart = { ...cart };
        const existingItem = updatedCart.cartItems.find(
          item => item.product._id === productId
        );

        if (existingItem) {
          existingItem.quantity = quantity;
        } else {
          // You'll need to fetch product details here
          const response = await fetch(`http://localhost:5000/api/products/${productId}`);
          const data = await response.json();
          if (data.success) {
            updatedCart.cartItems.push({
              product: data.data,
              quantity,
            });
          }
        }
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (token) {
        const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setCart(data.data);
        }
      } else {
        // Handle local cart
        const updatedCart = { ...cart };
        updatedCart.cartItems = updatedCart.cartItems.filter(
          item => item.product._id !== productId
        );
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      if (token) {
        const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        });
        const data = await response.json();
        if (data.success) {
          setCart(data.data);
        }
      } else {
        // Handle local cart
        const updatedCart = { ...cart };
        const item = updatedCart.cartItems.find(
          item => item.product._id === productId
        );
        if (item) {
          item.quantity = quantity;
          setCart(updatedCart);
        }
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
