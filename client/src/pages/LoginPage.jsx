import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import { AuthContext } from '../context/AuthContext.jsx';
import VideoBackground from '../components/VideoBackground';
import { FaGoogle, FaEnvelope, FaKey, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpirationMinutes, setOtpExpirationMinutes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isRedirectHandled = useRef(false);

  useEffect(() => {
    if (isRedirectHandled.current || (!location.search.includes('token=') && !location.search.includes('error='))) return;

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const userId = queryParams.get('userId');
    const userName = queryParams.get('userName');
    const userEmail = queryParams.get('userEmail');
    const authError = queryParams.get('error');

    if (token) {
      isRedirectHandled.current = true;
      const user = {
        id: userId,
        name: decodeURIComponent(userName),
        email: userEmail ? decodeURIComponent(userEmail) : ''
      };
      login(token, user);
      navigate('/profile', { replace: true });
    } else if (authError) {
      isRedirectHandled.current = true;
      setError(`Authentication failed: ${authError.replace(/_/g, ' ')}`);
      navigate('/login', { replace: true });
    }
  }, [location.search, login, navigate]);

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/send-otp', { email });
      setOtpSent(true);
      setOtpExpirationMinutes(res.data.otpExpirationMinutes);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/verify-otp', { email, otp });
      const token = res.data.token;
      const user = res.data.user;
      setAuthToken(token);
      login(token, user);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    isRedirectHandled.current = false;
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <VideoBackground 
      videoUrl="https://cdn.pixabay.com/video/2021/01/11/61682-500316045_large.mp4"
      overlay="bg-gradient-to-br from-emerald-900/60 via-green-900/50 to-teal-900/60"
      className="min-h-screen"
    >
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm p-10 text-center border-r border-white/20">
          <FaLock className="text-4xl text-white mb-4 drop-shadow-lg" />
          <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">Secure & Simple</h2>
          <p className="text-white/90 text-sm drop-shadow">Your wellness data is protected. Login with confidence.</p>
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-10 bg-white/10 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">Welcome Back 👋</h2>
          <p className="text-sm text-white/80 mb-6 text-center drop-shadow">Log in to continue your wellness journey</p>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4 shadow-sm animate-fade-in text-sm text-center">
              ❌ {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full transition text-base shadow-md hover:shadow-lg active:scale-95"
            disabled={loading}
          >
            <FaGoogle className="text-lg" />
            Login with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-3 text-gray-500">Or use Email OTP</span>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-sm bg-white shadow-sm"
                  disabled={otpSent || loading}
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-full transition text-sm shadow-md hover:shadow-lg active:scale-95"
                disabled={loading || !email}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            ) : (
              <>
                <p className="text-xs text-gray-500 text-center">
                  OTP sent to {email}. Valid for {otpExpirationMinutes} minutes.
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                  <div className="relative">
                    <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition text-sm bg-white shadow-sm"
                      disabled={loading}
                    />
                  </div>
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-full transition text-sm shadow-md hover:shadow-lg active:scale-95 mt-2"
                  disabled={loading || !otp}
                >
                  {loading ? 'Verifying...' : 'Verify OTP & Login'}
                </button>
              </>
            )}
          </div>

          <p className="mt-6 text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
    </VideoBackground>
  );
};

export default LoginPage;
