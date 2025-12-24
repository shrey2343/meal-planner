// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['x-auth-token'] = token;
    } else {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['x-auth-token'];
    }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [cart, setCart] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
  

  // 🔁 On mount: validate token and fetch user
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setAuthToken(token);

    const fetchUser = async () => {
      try {
        const res = await api.get('/users/me');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // ✅ Load cart after user is authenticated
  useEffect(() => {
    if (!token || !isAuthenticated) return;

    api.get('/cart')
      .then(res => {
        setCart(res.data); // ✅ direct cart state
        localStorage.setItem('persistedCart', JSON.stringify(res.data)); // optional
      })
      .catch(err => {
        console.error('Failed to load cart after login:', err);
      });
  }, [token, isAuthenticated]);

  const login = (newToken, userData) => {
    setAuthToken(newToken);
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAuthToken(null);
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
    setCart([]);
    localStorage.removeItem('persistedCart');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated,
        cart,
        setCart,
        savedItems,
         setSavedItems
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
