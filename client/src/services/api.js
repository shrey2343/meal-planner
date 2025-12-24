// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }

});

// set Axios's defaulf header
export const setAuthToken = token => {
    if (token) {
        
        api.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
};

export default api;









