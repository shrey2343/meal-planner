import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaAppleAlt,
  FaRunning,
  FaClipboardList,
  FaUserAlt,
  FaBolt,
  FaShoppingBasket,
  FaHeart,
  FaChartLine,
  FaStar,
  FaArrowRight,
  FaRobot,
  FaUtensils,
  FaDumbbell,
  FaShoppingCart,
  FaCalendarAlt,
  FaCheckCircle,
  FaMobileAlt,
  FaLock,
  FaClock
} from 'react-icons/fa';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Full Page Video Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2017/06/17/10048-222028257_large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Darker Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div 
              className="mb-6 animate-fade-in"
              style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            >
              <span className="inline-block px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-green-300 text-sm font-semibold mb-6">
                🌱 Your Health Journey Starts Here
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
              Transform Your Life with
              <span className="block text-green-400 drop-shadow-2xl">HealthFirst</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-lg">
              Your personalized health companion powered by smart technology. 
              Achieve your fitness goals with custom meal plans, workouts, and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/meal-plan"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started <FaArrowRight />
              </Link>
              <Link
                to="/exercises"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-md hover:bg-white/25 text-white font-bold rounded-full border-2 border-white/40 shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Explore Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-6 py-3 bg-green-500/30 backdrop-blur-md text-green-200 rounded-full text-sm font-bold mb-4 border-2 border-green-400/50 shadow-lg">
              ✨ Everything You Need
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
              Your Complete Wellness Hub
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-lg">
              Powerful tools designed to help you achieve your health goals with ease
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Personalized Meal Plans */}
            <div className="group bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/20 hover:border-green-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/80 to-emerald-500/80 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                <FaClipboardList className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">Personalized Meal Plans</h3>
              <p className="text-white/80 leading-relaxed mb-4 drop-shadow">
                AI-powered meal plans tailored to your body type, dietary preferences, and fitness goals.
              </p>
              <Link to="/meal-plan" className="inline-flex items-center gap-2 text-green-300 font-semibold hover:gap-3 transition-all drop-shadow">
                Get Started <FaArrowRight />
              </Link>
            </div>

            {/* Smart Workout Suggestions */}
            <div className="group bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/20 hover:border-indigo-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-400/80 to-purple-500/80 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                <FaRunning className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">Curated Exercises</h3>
              <p className="text-white/80 leading-relaxed mb-4 drop-shadow">
                Expert-designed workouts for every fitness level, from beginner-friendly to advanced training.
              </p>
              <Link to="/exercises" className="inline-flex items-center gap-2 text-indigo-300 font-semibold hover:gap-3 transition-all drop-shadow">
                Explore Workouts <FaArrowRight />
              </Link>
            </div>

            {/* Healthy Product Mart */}
            <div className="group bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/20 hover:border-pink-400/50">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400/80 to-rose-500/80 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                <FaShoppingBasket className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">Healthy Product Mart</h3>
              <p className="text-white/80 leading-relaxed mb-4 drop-shadow">
                Premium nutrition products, supplements, and healthy snacks delivered to your door.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 text-pink-300 font-semibold hover:gap-3 transition-all drop-shadow">
                Shop Now <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { icon: FaUserAlt, value: '10K+', label: 'Active Users' },
              { icon: FaAppleAlt, value: '50K+', label: 'Meals Planned' },
              { icon: FaHeart, value: '95%', label: 'Satisfaction' },
              { icon: FaChartLine, value: '4.8★', label: 'App Rating' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center bg-white/15 backdrop-blur-2xl rounded-2xl p-6 border-2 border-white/30 shadow-xl">
                <stat.icon className="text-4xl text-green-400 mx-auto mb-3 drop-shadow-lg" />
                <p className="text-3xl font-bold text-white mb-1 drop-shadow-2xl">{stat.value}</p>
                <p className="text-white drop-shadow-lg">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* AI Assistant Section */}
          <div className="bg-gradient-to-r from-green-500/80 via-emerald-500/80 to-teal-500/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center text-white relative overflow-hidden border-2 border-white/20">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBolt className="text-5xl text-yellow-300" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">Powered by Smart AI</h3>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow">
                Our intelligent system learns your preferences and adapts to your lifestyle, making healthy living effortless.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                  🧠 Smart Recommendations
                </span>
                <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                  📊 Progress Tracking
                </span>
                <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                  🎯 Goal Achievement
                </span>
              </div>
            </div>
          </div>

          {/* Comprehensive Features List */}
          <div className="mt-32 mb-20">
            <div className="text-center mb-16">
              <span className="inline-block px-6 py-3 bg-blue-500/30 backdrop-blur-md text-blue-200 rounded-full text-sm font-bold mb-4 border-2 border-blue-400/50 shadow-lg">
                🚀 Complete Feature Set
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
                Everything You Need in One App
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-lg">
                Discover all the powerful features designed to help you achieve your wellness goals
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1: AI Meal Planning */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">AI-Powered Meal Plans</h4>
                    <p className="text-white/80 text-sm drop-shadow">Generate personalized meal plans using Gemini AI based on your goals, preferences, and dietary restrictions</p>
                  </div>
                </div>
              </div>

              {/* Feature 2: Calorie Tracking */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaUtensils className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Smart Calorie Calculator</h4>
                    <p className="text-white/80 text-sm drop-shadow">Automatic TDEE calculation based on your age, weight, height, activity level, and fitness goals</p>
                  </div>
                </div>
              </div>

              {/* Feature 3: Macro Tracking */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaChartLine className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Macro Breakdown</h4>
                    <p className="text-white/80 text-sm drop-shadow">Track protein, carbs, and fats for each meal with detailed nutritional information</p>
                  </div>
                </div>
              </div>

              {/* Feature 4: Exercise Library */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaDumbbell className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Curated Exercise Library</h4>
                    <p className="text-white/80 text-sm drop-shadow">Access 100+ exercises with detailed instructions, images, and step-by-step guides</p>
                  </div>
                </div>
              </div>

              {/* Feature 5: Workout Plans */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Custom Workout Plans</h4>
                    <p className="text-white/80 text-sm drop-shadow">Create and save personalized workout routines with exercises tailored to your fitness level</p>
                  </div>
                </div>
              </div>

              {/* Feature 6: E-Commerce */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaShoppingCart className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Healthy Product Mart</h4>
                    <p className="text-white/80 text-sm drop-shadow">Shop premium nutrition products, supplements, and healthy snacks with integrated cart and checkout</p>
                  </div>
                </div>
              </div>

              {/* Feature 7: Recipe Details */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-teal-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClipboardList className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Detailed Recipes</h4>
                    <p className="text-white/80 text-sm drop-shadow">Get complete recipes with ingredients list, cooking instructions, and preparation time</p>
                  </div>
                </div>
              </div>

              {/* Feature 8: Progress Tracking */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-lime-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Progress Tracking</h4>
                    <p className="text-white/80 text-sm drop-shadow">Monitor your fitness journey with stats, achievements, and goal tracking</p>
                  </div>
                </div>
              </div>

              {/* Feature 9: User Profiles */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-indigo-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaUserAlt className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Personalized Profiles</h4>
                    <p className="text-white/80 text-sm drop-shadow">Manage your health data, preferences, allergies, and dietary restrictions in one place</p>
                  </div>
                </div>
              </div>

              {/* Feature 10: Order Management */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaShoppingBasket className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Order Management</h4>
                    <p className="text-white/80 text-sm drop-shadow">Track your orders, view order history, and manage deliveries with ease</p>
                  </div>
                </div>
              </div>

              {/* Feature 11: Mobile Responsive */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMobileAlt className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Mobile Responsive</h4>
                    <p className="text-white/80 text-sm drop-shadow">Access your health companion on any device - desktop, tablet, or mobile</p>
                  </div>
                </div>
              </div>

              {/* Feature 12: Secure Authentication */}
              <div className="bg-white/15 backdrop-blur-2xl p-6 rounded-2xl border-2 border-white/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaLock className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Secure Authentication</h4>
                    <p className="text-white/80 text-sm drop-shadow">Login with email/OTP or Google OAuth for secure and convenient access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">Ready to Transform Your Health?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/meal-plan"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500/80 to-emerald-600/80 backdrop-blur-md text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <FaAppleAlt />
                Start Your Meal Plan
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-xl text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl border-2 border-white/30 hover:border-green-300/50 transform hover:scale-105 transition-all duration-300"
              >
                <FaUserAlt />
                Complete Your Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
