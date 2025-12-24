import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import exercises from '../Data/exercisesData';
import FloatingPlanButton from '../components/FloatingPlanButton';
import VideoBackground from '../components/VideoBackground';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

import {
  FaClock,
  FaDumbbell,
  FaListUl,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaClipboardList
} from 'react-icons/fa';

export default function ExercisesPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [plan, setPlan] = useState([]);

  const filtered = exercises.filter(ex => {
    return (
      (!selectedCategory || ex.category === selectedCategory) &&
      (!selectedLevel || ex.level === selectedLevel)
    );
  });

  const toggleSteps = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // const addToPlan = (exercise) => {
  //   if (plan.find(item => item.id === exercise.id)) {
  //     alert(`${exercise.name} is already in your plan`);
  //   } else {
  //     setPlan(prev => [...prev, exercise]);
  //     alert(`${exercise.name} added to your plan`);
  //   }
  // };



const addToPlan = (exercise) => {
  if (!user) {
    toast.error('Please login to add exercises to your plan', {
      icon: '🔒',
      duration: 3000,
    });
    setTimeout(() => navigate('/login'), 1500);
    return;
  }
  
  const existing = JSON.parse(localStorage.getItem('exercisePlan')) || [];
  if (existing.find(item => item.id === exercise.id)) {
    toast.error(`${exercise.name} is already in your plan`, {
      icon: 'ℹ️',
    });
  } else {
    const updated = [...existing, exercise];
    localStorage.setItem('exercisePlan', JSON.stringify(updated));
    toast.success(`${exercise.name} added to your plan`, {
      icon: '💪',
    });
  }
};




  return (
    <VideoBackground 
      videoUrl="https://cdn.pixabay.com/video/2024/02/15/200657-913478674_large.mp4"
      overlay="bg-gradient-to-b from-indigo-900/60 via-purple-900/50 to-black/60"
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 py-8 text-white font-sans">

      <FloatingPlanButton plan={plan} />

      <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: '#333',
      color: '#fff',
      fontFamily: 'Poppins'
    },
    success: {
      iconTheme: {
        primary: '#00e676',
        secondary: '#fff'
      }
    }
  }}
/>


      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-500/80 backdrop-blur-md text-white rounded-3xl p-6 mb-8 shadow-2xl border border-white/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FaClipboardList className="text-white text-2xl" /> Exercise Zone
            </h1>
            <p className="text-sm text-gray-200 mt-1">
              Choose your category and level to explore curated workouts.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-medium shadow-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="" className="text-gray-800">All Categories</option>
              <option value="Cardio" className="text-gray-800">Cardio</option>
              <option value="Strength" className="text-gray-800">Strength</option>
              <option value="Core" className="text-gray-800">Core</option>
              <option value="Flexibility" className="text-gray-800">Flexibility</option>
              <option value="Mobility" className="text-gray-800">Mobility</option>
            </select>

            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-medium shadow-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="" className="text-gray-800">All Levels</option>
              <option value="Beginner" className="text-gray-800">Beginner</option>
              <option value="Intermediate" className="text-gray-800">Intermediate</option>
              <option value="Advanced" className="text-gray-800">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ex => (
          <div
            key={ex.id}
            className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 border-2 border-white/20 hover:border-purple-400/50"
          >
            <div className="w-full h-64 overflow-hidden rounded-t-3xl bg-white/5">
              <img
                src={ex.imageUrl}
                alt={ex.name}
                onError={(e) => { e.target.src = '/images/default-exercise.jpg'; }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-white drop-shadow-lg">{ex.name}</h3>
              <p className="text-sm text-white/80 drop-shadow">{ex.description}</p>

              <div className="flex items-center gap-2 text-sm text-white/70">
                <FaClock className="text-blue-400" />
                <span>{ex.duration} min</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/70">
                <FaDumbbell className="text-orange-400" />
                <span>{ex.equipment}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/70">
                <FaListUl className="text-purple-400" />
                <span>{ex.level}</span>
              </div>

              <ul className="mt-2 text-sm text-green-300">
                {ex.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaCheck className="text-green-400" /> {b}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => toggleSteps(ex.id)}
                className="mt-3 flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition-colors"
              >
                {expandedId === ex.id ? <FaChevronUp /> : <FaChevronDown />}
                {expandedId === ex.id ? 'Hide Steps' : 'Show Steps'}
              </button>

              {expandedId === ex.id && (
                <div className="mt-2 bg-white/10 backdrop-blur-md p-3 rounded-2xl text-sm text-white/90 border border-white/20">
                  <h4 className="font-semibold mb-2 text-white drop-shadow">How to Perform:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    {ex.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              <button
                onClick={() => addToPlan(ex)}
                className="mt-4 w-full bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-md hover:from-blue-600 hover:to-purple-600 text-white py-2.5 rounded-full flex items-center justify-center gap-2 font-semibold shadow-lg border border-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <FaPlus /> Add to Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </VideoBackground>
  );
}
