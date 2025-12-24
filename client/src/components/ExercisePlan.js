// src/components/ExercisePlan.js
import React, { useState } from 'react';
import axios from 'axios';

// A simple spinner component for loading states
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const ExercisePlan = () => {
  // State to hold the generated exercise plan
  const [plan, setPlan] = useState(null);
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to store any potential errors
  const [error, setError] = useState('');

  // State to manage user inputs from the form
  const [formData, setFormData] = useState({
    fitnessLevel: 'Beginner',
    goal: 'Weight Loss',
    availableEquipment: 'Bodyweight, Dumbbells',
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to call the backend API and generate the plan
  const handleGeneratePlan = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setLoading(true);
    setError('');
    setPlan(null);

    try {
      // Retrieve the user's authentication token
      const token = localStorage.getItem('token');
      
      // Prepare the payload, converting equipment string to an array
      const payload = {
        ...formData,
        availableEquipment: formData.availableEquipment.split(',').map(item => item.trim()),
      };

      // Make a POST request to the backend API
      const res = await axios.post('/api/exercise/generate', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set the received plan to the state
      if (res.data && res.data.plan) {
        setPlan(res.data.plan.weeklyPlan);
      } else {
        setError('Received an invalid plan format. Please try again.');
      }

    } catch (err) {
      setError('Could not generate the plan. Please check your connection or try again later.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AI Fitness Planner
          </h1>
          <p className="text-gray-400">
            Get a personalized weekly exercise plan tailored just for you.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <form onSubmit={handleGeneratePlan}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fitness Level Dropdown */}
              <div>
                <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Fitness Level
                </label>
                <select
                  id="fitnessLevel"
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              {/* Fitness Goal Dropdown */}
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Primary Goal
                </label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Weight Loss</option>
                  <option>Muscle Gain</option>
                  <option>General Fitness</option>
                  <option>Improve Endurance</option>
                </select>
              </div>
            </div>

            {/* Available Equipment Input */}
            <div className="mt-6">
              <label htmlFor="availableEquipment" className="block text-sm font-medium text-gray-300 mb-2">
                Available Equipment (comma-separated)
              </label>
              <input
                type="text"
                id="availableEquipment"
                name="availableEquipment"
                value={formData.availableEquipment}
                onChange={handleChange}
                placeholder="e.g., Bodyweight, Dumbbells, Resistance Bands"
                className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
              >
                {loading ? 'Generating...' : 'Generate My Plan'}
              </button>
            </div>
          </form>
        </div>

        {/* Display Area for Loading, Error, or the Plan */}
        {loading && <Spinner />}
        {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
        
        {plan && (
          <div className="plan-container mt-8">
            <h2 className="text-3xl font-bold text-center mb-6">Your Weekly Plan</h2>
            <div className="space-y-6">
              {plan.map((dailyPlan, index) => (
                <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">{dailyPlan.day} - <span className="text-gray-300">{dailyPlan.focus}</span></h3>
                  <ul className="space-y-3">
                    {dailyPlan.exercises.map((ex, exIndex) => (
                      <li key={exIndex} className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
                        <div>
                          <strong className="text-white">{ex.name}</strong>
                          <p className="text-sm text-gray-400">{ex.sets} sets of {ex.reps} reps (Rest: {ex.rest})</p>
                        </div>
                        {ex.videoUrl && (
                          <a
                            href={ex.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded-md transition-colors"
                          >
                            Watch
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisePlan;
