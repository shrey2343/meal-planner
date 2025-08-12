// client/src/components/AuthConsumer.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import Navbar from './Navbar';

const AuthConsumer = ({ children }) => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // लॉगइन और लॉगआउट के लिए नेविगेशन फ़ंक्शन
  const handleLogin = (token, userData) => {
    login(token, userData);
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // अब AuthContext को एक अपडेटेड वैल्यू पास करो
  const authContextValue = {
    user,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <Navbar />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthConsumer;