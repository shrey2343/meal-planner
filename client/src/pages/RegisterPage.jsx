// client/src/pages/RegisterPage.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext.jsx';
import VideoBackground from '../components/VideoBackground';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const res = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            // On successful registration, automatically log the user in
            login(res.data.token, res.data.user);
            setSuccessMessage('Registration successful! Redirecting to profile...');
            setTimeout(() => {
                navigate('/profile');
            }, 1500); // Redirect after a short delay
            
        } catch (err) {
            console.error('Registration error:', err.response?.data || err.message);
            setError(err.response?.data?.msg || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <VideoBackground 
            videoUrl="https://cdn.pixabay.com/video/2023/02/07/149712-796873499_large.mp4"
            overlay="bg-gradient-to-br from-blue-900/60 via-indigo-900/50 to-purple-900/60"
            className="min-h-screen"
        >
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 sm:p-10 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">Create Your Account</h2>
                <p className="text-sm text-white/80 mb-6 text-center drop-shadow">Join AI Fit MealPlanner today!</p>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="bg-green-100 text-green-700 border border-green-300 p-3 rounded mb-4 text-sm text-center">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-sm"
                                disabled={loading}
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
                                disabled={loading}
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
                                placeholder="Enter your password"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-sm"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-sm"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition text-sm shadow-sm"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
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
        </VideoBackground>
    );
};

export default RegisterPage;
