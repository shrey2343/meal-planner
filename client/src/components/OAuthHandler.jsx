import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OAuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const userId = queryParams.get('userId');
    const userName = queryParams.get('userName');
    const userEmail = queryParams.get('userEmail');

    if (token && userId) {
      const user = {
        id: userId,
        name: decodeURIComponent(userName || ''),
        email: userEmail ? decodeURIComponent(userEmail) : ''
      };
      login(token, user);
      navigate('/profile', { replace: true });
    }
  }, [location.search, login, navigate]);

  return null;
};

export default OAuthHandler;
