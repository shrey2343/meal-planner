// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// यह फंक्शन टोकन को Axios के डिफ़ॉल्ट हेडर में सेट करता है
export const setAuthToken = token => {
    if (token) {
        // अगर टोकन है, तो Authorization हेडर सेट करो
        api.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        // अगर टोकन नहीं है, तो हेडर हटा दो
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
};

export default api;









