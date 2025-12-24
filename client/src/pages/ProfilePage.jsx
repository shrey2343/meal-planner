import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import VideoBackground from '../components/VideoBackground';
import api from '../services/api';
import {
  FaWeight, FaRulerVertical, FaBirthdayCake, FaTransgender, FaRunning,
  FaBullseye, FaSeedling, FaEdit, FaSave, FaTimes
} from 'react-icons/fa';
import { Loader } from '../components/Loader';

const ProfilePage = () => {
  const { user, login } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/me');
        setProfile(res.data);
      } catch (err) {
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async () => {
    setSuccessMsg(null);
    setError(null);
    try {
      const res = await api.put('/users/me', profile);
      login(api.defaults.headers.common['x-auth-token'], res.data);
      setSuccessMsg('Profile updated successfully!');
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Profile update failed.');
    }
  };

  const goalProgress = profile.goal === 'lose' ? 70 : profile.goal === 'gain' ? 40 : 90;

  if (loading) return <div className="text-center py-10"><Loader /></div>;

  return (
    <VideoBackground 
      videoUrl="https://cdn.pixabay.com/video/2023/05/02/160992-822726608_large.mp4"
      overlay="bg-gradient-to-b from-teal-900/50 via-cyan-900/40 to-black/50"
      className="min-h-screen"
    >
      <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Feedback */}
      {successMsg && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-4 shadow-sm animate-fade-in">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4 shadow-sm animate-fade-in">
          {error}
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex items-center justify-between mb-10 border border-emerald-100 hover:shadow-2xl transition duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-300 to-emerald-500 text-white flex items-center justify-center text-3xl font-bold shadow-inner">
            {user?.name?.[0] || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'User Name'}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-300 ${
            editMode
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
        >
          {editMode ? <FaTimes /> : <FaEdit />}
          <span>{editMode ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Grid Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Body Metrics */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1 col-span-2">
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-emerald-600">
            <FaWeight className="text-emerald-500" />
            <span>Body Metrics</span>
          </h3>
          {['weight', 'height', 'age', 'gender'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-600 capitalize mb-1">{field}</label>
              {editMode ? (
                field === 'gender' ? (
                  <select
                    name={field}
                    value={profile[field] || ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <input
                    type="number"
                    name={field}
                    value={profile[field] || ''}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                )
              ) : (
                <p className="text-gray-800">{profile[field] || '—'}</p>
              )}
            </div>
          ))}
        </div>

        {/* Goal Progress Ring */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center justify-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
          <h3 className="text-xl font-bold mb-4 text-emerald-600 flex items-center gap-2">
            <FaBullseye /> Goal Progress
          </h3>
          <div className="relative w-32 h-32">
            <svg className="absolute top-0 left-0 w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45"
                stroke="#10b981"
                strokeWidth="10"
                fill="none"
                strokeDasharray="282"
                strokeDashoffset={282 - (goalProgress / 100) * 282}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-green-600">
              {goalProgress}%
            </div>
          </div>
          <p className="mt-2 text-gray-500 text-sm">Based on your selected goal</p>
        </div>
      </div>

      {/* Fitness & Diet */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-emerald-600">
          <FaSeedling className="text-emerald-500" />
          <span>Fitness & Diet</span>
        </h3>

        {/* Activity Level */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Activity Level</label>
          {editMode ? (
            <select
              name="activityLevel"
              value={profile.activityLevel || ''}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select</option>
              <option value="sedentary">Sedentary</option>
              <option value="light">Lightly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="active">Very Active</option>
              <option value="very active">Extra Active</option>
            </select>
          ) : (
            <p className="text-gray-800">{profile.activityLevel || '—'}</p>
          )}
        </div>

        {/* Goal */}
                <div className="mb-4 mt-6">
          <label className="block text-gray-600 mb-1">Goal</label>
          {editMode ? (
            <select
              name="goal"
              value={profile.goal || ''}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select</option>
              <option value="lose">Weight Loss</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Muscle Gain</option>
            </select>
          ) : (
            <p className="text-gray-800">{profile.goal || '—'}</p>
          )}
        </div>
                <div className="mt-4">
          <label className="block text-gray-600 mb-1">Dietary Preferences</label>
          {editMode ? (
            <div className="space-x-4">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isVegetarian"
                  checked={profile.isVegetarian || false}
                  onChange={handleChange}
                  className="accent-green-500"
                />
                Vegetarian
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isVegan"
                  checked={profile.isVegan || false}
                  onChange={handleChange}
                  className="accent-green-500"
                />
                Vegan
              </label>
            </div>
          ) : (
            <p className="text-gray-800">
              {profile.isVegetarian ? 'Vegetarian ' : ''}
              {profile.isVegan ? 'Vegan' : ''}
              {!profile.isVegetarian && !profile.isVegan && '—'}
            </p>
          )}
        </div>
      </div>

            {editMode && (
        <div className="text-center mt-10">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <FaSave className="animate-pulse" />
            <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
    </VideoBackground>
  );
};

export default ProfilePage;

      

         