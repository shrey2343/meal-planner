import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader } from '../components/Loader';
import VideoBackground from '../components/VideoBackground';
import { FaLeaf, FaRedo, FaFire, FaDrumstickBite, FaBreadSlice, FaTint, FaClock, FaHeart } from 'react-icons/fa';
import "../App.css"

const MealPlanPage = () => {
    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState(null);

    const fetchMealPlan = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/mealplans/me'); 
            setMealPlan(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || 'No meal plan found yet.');
            setMealPlan(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMealPlan();
    }, []);

    const handleGenerateNew = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post('/mealplans/generate');
            setMealPlan(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate meal plan. Please check your profile.');
            setMealPlan(null);
        } finally {
            setLoading(false);
        }
    };

    const getMealIcon = (mealType) => {
        switch (mealType.toLowerCase()) {
            case 'breakfast':
                return { icon: '🌅', color: 'from-orange-400 to-amber-500', bg: 'bg-orange-50' };
            case 'lunch':
                return { icon: '☀️', color: 'from-green-400 to-emerald-500', bg: 'bg-green-50' };
            case 'dinner':
                return { icon: '🌙', color: 'from-indigo-400 to-purple-500', bg: 'bg-indigo-50' };
            default:
                return { icon: '🍽️', color: 'from-gray-400 to-gray-500', bg: 'bg-gray-50' };
        }
    };

    const getUniqueMeals = () => {
        const rawMeals = Array.isArray(mealPlan?.meals)
            ? mealPlan.meals
            : Array.isArray(mealPlan?.meals?.weeklyPlan)
                ? mealPlan.meals.weeklyPlan
                : [];

        const seenTitles = new Set();
        return rawMeals.filter((meal) => {
            const title = meal.recipe?.title;
            if (!title) return true;
            if (seenTitles.has(title)) return false;
            seenTitles.add(title);
            return true;
        });
    };

    const uniqueMeals = mealPlan ? getUniqueMeals() : [];
    const totalCalories = uniqueMeals.reduce((sum, meal) => sum + (meal.recipe?.nutritionInfo?.calories || 0), 0);
    const totalProtein = uniqueMeals.reduce((sum, meal) => sum + (meal.recipe?.nutritionInfo?.protein || 0), 0);
    const totalCarbs = uniqueMeals.reduce((sum, meal) => sum + (meal.recipe?.nutritionInfo?.carbs || 0), 0);
    const totalFats = uniqueMeals.reduce((sum, meal) => sum + (meal.recipe?.nutritionInfo?.fats || 0), 0);

    return (
        <VideoBackground 
            videoUrl="https://cdn.pixabay.com/video/2020/04/15/35847-410743966_large.mp4"
            overlay="bg-gradient-to-b from-black/50 via-black/40 to-black/50"
            className="min-h-screen"
        >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600/80 via-emerald-600/80 to-teal-600/80 backdrop-blur-md text-white py-12 px-6 shadow-xl rounded-3xl mb-8 border border-white/20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
                                <span className="text-5xl">🍽️</span>
                                Your Meal Plan
                            </h1>
                            <p className="text-green-100 text-lg">Personalized nutrition for your goals</p>
                        </div>
                        <button
                            onClick={handleGenerateNew}
                            disabled={loading}
                            className="group relative px-8 py-4 bg-white text-green-600 font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="flex items-center gap-3">
                                <FaRedo className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                                {loading ? 'Generating...' : 'Generate New Plan'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader />
                        <p className="mt-6 text-gray-600 text-lg animate-pulse">Creating your perfect meal plan...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg p-12 text-center border-2 border-white/20">
                        <div className="text-6xl mb-6">🍳</div>
                        <h3 className="text-2xl font-bold text-white mb-3">No Meal Plan Yet</h3>
                        <p className="text-white/80 mb-8 max-w-md mx-auto">{error}</p>
                        <button
                            onClick={handleGenerateNew}
                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            Create Your First Meal Plan
                        </button>
                    </div>
                )}

                {mealPlan && !loading && (
                    <div className="space-y-8">
                        {/* Nutrition Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {/* Target Calories */}
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <FaFire className="text-3xl opacity-80" />
                                    <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Target</span>
                                </div>
                                <p className="text-4xl font-bold mb-1">{mealPlan.tdee}</p>
                                <p className="text-green-100 text-sm">kcal/day</p>
                            </div>

                            {/* Total Calories */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-lg border-2 border-white/20 transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <FaFire className="text-3xl text-orange-500" />
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">{totalCalories}</p>
                                <p className="text-white/80 text-sm">Total Calories</p>
                            </div>

                            {/* Protein */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-lg border-2 border-white/20 transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <FaDrumstickBite className="text-3xl text-red-400" />
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">{totalProtein}g</p>
                                <p className="text-white/80 text-sm">Protein</p>
                            </div>

                            {/* Carbs */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-lg border-2 border-white/20 transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <FaBreadSlice className="text-3xl text-amber-400" />
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">{totalCarbs}g</p>
                                <p className="text-white/80 text-sm">Carbs</p>
                            </div>

                            {/* Fats */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-lg border-2 border-white/20 transform hover:scale-105 transition-all duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <FaTint className="text-3xl text-yellow-400" />
                                </div>
                                <p className="text-4xl font-bold text-white mb-1">{totalFats}g</p>
                                <p className="text-white/80 text-sm">Fats</p>
                            </div>
                        </div>

                        {/* Meal Cards */}
                        <div className="grid gap-8">
                            {uniqueMeals.map((meal, index) => {
                                const mealStyle = getMealIcon(meal.mealType);
                                return (
                                    <div
                                        key={meal._id || index}
                                        className="group bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border-2 border-white/20 hover:border-green-300/50 transform hover:scale-[1.02] transition-all duration-300"
                                    >
                                        <div className={`bg-gradient-to-r ${mealStyle.color} p-6 text-white`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-5xl">{mealStyle.icon}</span>
                                                    <div>
                                                        <h3 className="text-2xl font-bold">{meal.mealType}</h3>
                                                        <p className="text-white/80 text-sm">Delicious & Nutritious</p>
                                                    </div>
                                                </div>
                                                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300">
                                                    <FaHeart className="text-2xl" />
                                                </button>
                                            </div>
                                        </div>

                                        {meal.recipe ? (
                                            <div className="p-8 bg-white/5 backdrop-blur-sm">
                                                <div className="flex flex-col lg:flex-row gap-8">
                                                    {/* Recipe Image */}
                                                    {meal.recipe.imageUrl && (
                                                        <div className="lg:w-1/3">
                                                            <img
                                                                src={meal.recipe.imageUrl}
                                                                alt={meal.recipe.title}
                                                                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                                                                onError={(e) => {
                                                                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800';
                                                                }}
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Recipe Details */}
                                                    <div className="flex-1">
                                                        <h4 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                                                            {meal.recipe.title}
                                                        </h4>
                                                        <p className="text-white/90 mb-6 leading-relaxed drop-shadow">
                                                            {meal.recipe.description}
                                                        </p>

                                                        {/* Nutrition Info */}
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                                            {[
                                                                { label: 'Calories', value: meal.recipe.nutritionInfo?.calories, icon: FaFire, color: 'orange' },
                                                                { label: 'Protein', value: meal.recipe.nutritionInfo?.protein, icon: FaDrumstickBite, color: 'red' },
                                                                { label: 'Carbs', value: meal.recipe.nutritionInfo?.carbs, icon: FaBreadSlice, color: 'amber' },
                                                                { label: 'Fats', value: meal.recipe.nutritionInfo?.fats, icon: FaTint, color: 'yellow' },
                                                            ].map((nutrient, idx) => {
                                                                const Icon = nutrient.icon;
                                                                return (
                                                                    <div key={idx} className={`bg-${nutrient.color}-50 rounded-2xl p-4 text-center border-2 border-${nutrient.color}-100`}>
                                                                        <Icon className={`text-2xl text-${nutrient.color}-500 mx-auto mb-2`} />
                                                                        <p className="text-sm text-gray-500 mb-1">{nutrient.label}</p>
                                                                        <p className="text-xl font-bold text-gray-800">
                                                                            {nutrient.value || 'N/A'}
                                                                            {nutrient.label !== 'Calories' && 'g'}
                                                                        </p>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Ingredients */}
                                                        <div className="mb-8">
                                                            <h5 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                                <FaLeaf className="text-green-500" />
                                                                Ingredients
                                                            </h5>
                                                            <div className="grid sm:grid-cols-2 gap-3">
                                                                {meal.recipe.ingredients.map((item, i) => (
                                                                    <div key={i} className="flex items-center gap-3 bg-green-50 rounded-xl p-3 border border-green-100">
                                                                        <span className="text-green-500 font-bold">✓</span>
                                                                        <span className="text-gray-700">{item}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Instructions */}
                                                        <div>
                                                            <h5 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                                <FaClock className="text-blue-500" />
                                                                Cooking Instructions
                                                            </h5>
                                                            <div className="space-y-4">
                                                                {meal.recipe.instructions.map((step, i) => (
                                                                    <div key={i} className="flex gap-4">
                                                                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                                                                            {i + 1}
                                                                        </div>
                                                                        <p className="text-gray-700 leading-relaxed pt-2">{step}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-8 text-center text-gray-500">
                                                <p>Recipe details not available</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Generated Date */}
                        <div className="text-center text-gray-500 text-sm mt-8">
                            <p>Plan generated on {new Date(mealPlan.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</p>
                        </div>
                    </div>
                )}
            </div>
        </VideoBackground>
    );
};

export default MealPlanPage;
