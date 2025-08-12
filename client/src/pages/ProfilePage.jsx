// client/src/pages/ProfilePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
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

  if (loading) return <div className="text-center py-10"><Loader /></div>;

  return (
    <div className="max-w-5xl mx-auto my-10 p-4">
      {/* Success & Error */}
      {successMsg && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">{successMsg}</div>}
      {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}

      {/* Profile Summary Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
            {user?.name?.[0] || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'User Name'}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
        >
          {editMode ? <FaTimes /> : <FaEdit />}
          <span>{editMode ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Section Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Body Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <FaWeight className="text-green-500" /> <span>Body Metrics</span>
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

        {/* Fitness & Diet */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <FaBullseye className="text-green-500" /> <span>Fitness & Diet</span>
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
          <div>
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

          {/* Dietary Preferences */}
          <div className="mt-4">
            <label className="block text-gray-600 mb-1">Dietary Preferences</label>
            {editMode ? (
              <div className="space-x-4">
                <label>
                  <input type="checkbox" name="isVegetarian" checked={profile.isVegetarian || false} onChange={handleChange} /> Vegetarian
                </label>
                <label>
                  <input type="checkbox" name="isVegan" checked={profile.isVegan || false} onChange={handleChange} /> Vegan
                </label>
              </div>
            ) : (
              <p className="text-gray-800">
                {profile.isVegetarian ? 'Vegetarian ' : ''}{profile.isVegan ? 'Vegan' : ''}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      {editMode && (
        <div className="text-center mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center space-x-2 mx-auto"
          >
            <FaSave /> <span>Save Changes</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;





