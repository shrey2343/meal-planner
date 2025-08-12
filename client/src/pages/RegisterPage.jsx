// // client/src/pages/RegisterPage.jsx
// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../services/api';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

// const RegisterPage = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//     const [error, setError] = useState(null);
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         try {
//             const res = await api.post('/auth/register', formData);
//             login(res.data.token, res.data.user);
//             navigate('/profile');
//         } catch (err) {
//             setError(err.response?.data?.msg || 'Registration failed. Please try again.');
//         }
//     };

//     return (
//         <div className="min-h-[calc(100vh-8rem)] flex justify-center items-center">
//             <div className="card w-full max-w-lg p-10">
//                 <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Create an Account</h2>
//                 <p className="text-center text-gray-500 mb-8">Join us to get your personalized fitness journey started!</p>
//                 {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">{error}</div>}
                
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label className="form-label">Full Name</label>
//                         <div className="relative">
//                             <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className="form-input pl-12"
//                                 placeholder="Enter your full name"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="form-label">Email</label>
//                         <div className="relative">
//                             <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="form-input pl-12"
//                                 placeholder="Enter your email"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label className="form-label">Password</label>
//                         <div className="relative">
//                             <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className="form-input pl-12"
//                                 placeholder="Create a password"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <button type="submit" className="btn btn-primary w-full mt-4">
//                         Register
//                     </button>
//                 </form>
//                 <div className="mt-8 text-center">
//                     <p className="text-gray-500">
//                         Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterPage;




import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext.jsx';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await api.post('/auth/register', formData);
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create an Account</h2>
                <p className="text-sm text-gray-500 mb-6 text-center">Join us and start your wellness journey today</p>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition text-sm shadow-sm"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
