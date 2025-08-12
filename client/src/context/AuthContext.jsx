// // // client/src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem('token') || null);
//     const [loading, setLoading] = useState(true);

//     // Axios default header setup
//     useEffect(() => {
//         if (token) {
//             axios.defaults.headers.common['x-auth-token'] = token;
//         } else {
//             delete axios.defaults.headers.common['x-auth-token'];
//         }
//     }, [token]);

//     // Load user on app start
//     useEffect(() => {
//         const loadUser = async () => {
//             if (token) {
//                 try {
//                     const res = await axios.get('/api/auth/me'); // Corrected endpoint for fetching user data
//                     setUser(res.data);
//                 } catch (err) {
//                     console.error('Failed to fetch user data:', err);
//                     setToken(null);
//                     localStorage.removeItem('token');
//                     setUser(null);
//                 }
//             }
//             setLoading(false);
//         };
//         loadUser();
//     }, [token]);

//     const login = async (userToken, userData) => {
//         setToken(userToken);
//         localStorage.setItem('token', userToken);
//         setUser(userData);
//     };

//     const logout = () => {
//         setToken(null);
//         localStorage.removeItem('token');
//         setUser(null);
//     };

//     const authContextValue = {
//         user,
//         token,
//         loading,
//         login,
//         logout,
//     };

//     return (
//         <AuthContext.Provider value={authContextValue}>
//             {children}
//         </AuthContext.Provider>
//     );
// };




// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
            const fetchUser = async () => {
                try {
                    const res = await api.get('/users/me');
                    setUser(res.data);
                } catch (err) {
                    console.error("Failed to fetch user data on load:", err);
                    setAuthToken(null);
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token, userData) => {
        setAuthToken(token);
        setUser(userData);
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};






