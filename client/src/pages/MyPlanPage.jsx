import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import VideoBackground from '../components/VideoBackground';
import toast from 'react-hot-toast';
import {
  FaTrashAlt,
  FaClock,
  FaDumbbell,
  FaListUl,
  FaCheck,
  FaClipboardList
} from 'react-icons/fa';

export default function MyPlanPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view your workout plan', {
        icon: '🔒',
        duration: 3000,
      });
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    const saved = JSON.parse(localStorage.getItem('exercisePlan')) || [];
    setPlan(saved);
  }, [user, navigate]);

  const removeExercise = (id) => {
    const updated = plan.filter(ex => ex.id !== id);
    setPlan(updated);
    localStorage.setItem('exercisePlan', JSON.stringify(updated));
    toast.success('Exercise removed from plan', {
      icon: '🗑️',
    });
  };

  const clearPlan = () => {
    localStorage.removeItem('exercisePlan');
    setPlan([]);
    toast.success('Workout plan cleared', {
      icon: '✨',
    });
  };

  const totalDuration = plan.reduce((sum, ex) => sum + ex.duration, 0);

  return (
    <VideoBackground 
      videoUrl="https://media.istockphoto.com/id/1739041393/video/close-up-shot-of-asian-woman-professional-nutritionists-giving-advice-to-customers-about.mp4?s=mp4-640x640-is&k=20&c=orLz4Oc7Kwdky-m1KATdN_lkoYKyvPXg7KNQEacAJX8="
      overlay="bg-gradient-to-b from-purple-900/60 via-indigo-900/50 to-black/60"
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 text-white rounded-xl p-6 mb-8 shadow-lg">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <FaClipboardList className="text-white text-2xl" /> My Workout Plan
      </h1>
      <p className="text-sm text-gray-200 mt-1">
        Your personalized exercises — track, review, and stay consistent.
      </p>
    </div>

    {plan.length > 0 && (
      <button
        onClick={clearPlan}
        className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-md"
      >
        Clear Entire Plan
      </button>
    )}
  </div>



      {plan.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No exercises added yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.map(ex => (
              <div key={ex.id} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition">
                <div className="w-full h-56 overflow-hidden bg-gray-800">
                  <img
                    src={ex.imageUrl}
                    alt={ex.name}
                    onError={(e) => { e.target.src = '/images/default-exercise.jpg'; }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">{ex.name}</h3>
                  <p className="text-sm text-gray-300">{ex.description}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FaClock /> <span>{ex.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FaDumbbell /> <span>{ex.equipment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FaListUl /> <span>{ex.level}</span>
                  </div>

                  <ul className="mt-2 text-sm text-green-400 space-y-1">
                    {ex.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FaCheck className="text-green-500" /> {b}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => removeExercise(ex.id)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-lg font-medium text-blue-400">
            Total Duration: <span className="font-bold text-white">{totalDuration} min</span>
          </div>
        </>
      )}
    </div>
    </div>
    </VideoBackground>
  );
}
