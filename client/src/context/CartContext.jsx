// client/src/context/CartContext.jsx
import React, { createContext, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { cart, setCart, isAuthenticated } = useContext(AuthContext);

  // ➕ Add to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post('/cart', { productId, quantity });

      const existing = cart.find(item => item.productId === productId);
      const updated = existing
        ? cart.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...cart, { productId, quantity }];

      setCart(updated);
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };

  //  Remove from cart
  const removeFromCart = async productId => {
    try {
      await api.delete(`/cart/${productId}`);
      const updated = cart.filter(item => item.productId !== productId);
      setCart(updated);
    } catch (err) {
      console.error('Remove from cart failed:', err);
    }
  };

  //  Clear cart
  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      setCart([]);
    } catch (err) {
      console.error('Clear cart failed:', err);
    }
  };


  const updateCartQuantity = (productId, newQty) => {
  setCart(prev =>
    prev.map(item =>
      item.productId === productId ? { ...item, quantity: newQty } : item
    )
  );
};


  return (
    
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCartQuantity  }}>
      {children}
      
    </CartContext.Provider>
  );
}

export default CartProvider;