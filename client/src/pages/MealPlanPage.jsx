// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import { Loader } from '../components/Loader';
// import { FaLeaf, FaRedo } from 'react-icons/fa';

// const MealPlanPage = () => {
//     const [mealPlan, setMealPlan] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchMealPlan = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const res = await api.get('/mealplans/me');
//             setMealPlan(res.data);
//         } catch (err) {
//             setError(err.response?.data?.msg || 'Failed to fetch meal plan.');
//             setMealPlan(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchMealPlan();
//     }, []);

//     const handleGenerateNew = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const res = await api.post('/mealplans/generate');
//             setMealPlan(res.data);
//         } catch (err) {
//             setError(err.response?.data?.msg || 'Failed to generate new meal plan. Please check your profile data.');
//             setMealPlan(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getMealIcon = (mealType) => {
//         switch (mealType.toLowerCase()) {
//             case 'breakfast':
//                 return '☀️';
//             case 'lunch':
//                 return '🥗';
//             case 'dinner':
//                 return '🌙';
//             default:
//                 return '🍽️';
//         }
//     };

//     return (
//         <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
//             <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-green-100">
//                 <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent text-center mb-8">
//                     Your Personalized Meal Plan
//                 </h2>

//                 <div className="flex justify-center mb-10">
//                     <button
//                         onClick={handleGenerateNew}
//                         className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
//                     >
//                         <FaRedo />
//                         {loading ? 'Generating...' : 'Generate New Meal Plan'}
//                     </button>
//                 </div>

//                 {loading && <Loader />}

//                 {error && (
//                     <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded mb-6 text-center">
//                         {error}
//                     </div>
//                 )}

//                 {mealPlan && (
//                     <div>
//                         <div className="bg-green-50 border border-green-200 p-5 rounded-xl mb-8 text-center shadow-sm">
//                             <p className="text-sm text-gray-500">
//                                 Generated on: {new Date(mealPlan.date).toLocaleDateString()}
//                             </p>
//                             <p className="text-lg font-semibold text-gray-700">
//                                 Daily Calorie Target:{' '}
//                                 <span className="text-emerald-600">{mealPlan.tdee}</span> kcal
//                             </p>
//                         </div>

//                         {mealPlan.meals && mealPlan.meals.length > 0 ? (
//                             <div className="grid gap-6">
//                                 {mealPlan.meals.map((meal) => (
//                                     <div
//                                         key={meal._id}
//                                         className="bg-white border border-gray-100 rounded-xl shadow-md p-6 transition transform hover:shadow-lg hover:-translate-y-1"
//                                     >
//                                         <div className="flex items-center mb-4">
//                                             <span className="text-2xl mr-3">{getMealIcon(meal.mealType)}</span>
//                                             <h4 className="text-xl font-bold text-gray-800">{meal.mealType}</h4>
//                                         </div>

//                                         {meal.recipe ? (
//                                             <>
//                                                 <h5 className="text-lg font-semibold text-emerald-700 mb-1">
//                                                     {meal.recipe.title}
//                                                 </h5>
//                                                 <p className="text-sm text-gray-500 mb-4">{meal.recipe.description}</p>

//                                                 <div className="mb-4">
//                                                     <h6 className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-1">
//                                                         <FaLeaf className="text-green-500" /> Ingredients
//                                                     </h6>
//                                                     <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-2">
//                                                         {meal.recipe.ingredients.map((item, i) => (
//                                                             <li key={i}>{item}</li>
//                                                         ))}
//                                                     </ul>
//                                                 </div>

//                                                 <div className="mb-4">
//                                                     <h6 className="text-sm font-bold text-gray-700 mb-1">Instructions</h6>
//                                                     <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 pl-2">
//                                                         {meal.recipe.instructions.map((step, i) => (
//                                                             <li key={i}>{step}</li>
//                                                         ))}
//                                                     </ol>
//                                                 </div>

//                                                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-4">
//                                                     {[
//                                                         { label: 'Calories', value: meal.recipe.nutritionInfo?.calories },
//                                                         { label: 'Protein', value: meal.recipe.nutritionInfo?.protein },
//                                                         { label: 'Carbs', value: meal.recipe.nutritionInfo?.carbs },
//                                                         { label: 'Fats', value: meal.recipe.nutritionInfo?.fats },
//                                                     ].map((nutrient, idx) => (
//                                                         <div key={idx} className="bg-green-50 rounded-lg p-3 shadow-sm">
//                                                             <p className="text-xs text-gray-500">{nutrient.label}</p>
//                                                             <p className="text-base font-bold text-emerald-700">
//                                                                 {nutrient.value || 'N/A'}
//                                                             </p>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             <p className="text-sm text-gray-500">Recipe not found.</p>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <p className="text-center text-gray-500 text-base mt-8">
//                                 No meal plan found. Click "Generate New Meal Plan" to get started!
//                             </p>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MealPlanPage;








// // client/src/pages/MealPlanPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate and useLocation को इंपोर्ट करें
// import api from '../services/api';
// import { Loader } from '../components/Loader';
// import { FaLeaf, FaRedo, FaShoppingCart, FaHeart, FaShareAlt } from 'react-icons/fa'; // सभी आवश्यक आइकनों को इंपोर्ट करें

// const MealPlanPage = () => {
//     const location = useLocation(); // URL से स्टेट प्राप्त करने के लिए
//     const navigate = useNavigate(); // नेविगेट करने के लिए

//     // mealPlan को location.state से इनिशियलाइज़ करें या null रखें
//     const [mealPlan, setMealPlan] = useState(location.state?.mealPlan || null);
//     const [loading, setLoading] = useState(false); // जनरेशन/फ़ेचिंग के लिए
//     const [error, setError] = useState(null);
//     const [shoppingList, setShoppingList] = useState([]);
//     const [showShoppingList, setShowShoppingList] = useState(false);
//     const [activeDay, setActiveDay] = useState(0); // Weekly plan के लिए सक्रिय दिन

//     // जब कंपोनेंट लोड हो या location.state बदल जाए, तो मील प्लान फ़ेच करें
//     useEffect(() => {
//         // यदि मील प्लान पहले से state में नहीं है (यानी ProfilePage से नहीं आया), तो सर्वर से फ़ेच करें
//         if (!mealPlan) {
//             const fetchMealPlan = async () => {
//                 setLoading(true);
//                 setError(null);
//                 try {
//                     // सुनिश्चित करें कि यहाँ 'meal-plans' (hyphen के साथ) है
//                     const res = await api.get('/meal-plans/me');
//                     setMealPlan(res.data);
//                 } catch (err) {
//                     setError(err.response?.data?.msg || 'Failed to fetch meal plan.');
//                     setMealPlan(null);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchMealPlan();
//         }
//     }, [mealPlan, location.state]); // mealPlan और location.state दोनों पर निर्भर करेगा

//     // शॉपिंग लिस्ट जनरेट करने का हैंडलर
//     const handleGenerateShoppingList = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             // सुनिश्चित करें कि यहाँ 'meal-plans' (hyphen के साथ) है
//             const res = await api.get('/meal-plans/shopping-list');
//             setShoppingList(res.data.shoppingList);
//             setShowShoppingList(true);
//         } catch (err) {
//             setError(err.response?.data?.msg || 'Failed to generate shopping list.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // नया मील प्लान जनरेट करने के लिए ProfilePage पर नेविगेट करें
//     const handleGenerateNew = () => {
//         navigate('/profile'); // यूज़र को प्लान टाइप चुनने के लिए प्रोफाइल पेज पर भेजें
//     };

//     // मील टाइप के आधार पर आइकॉन प्राप्त करें
//     const getMealIcon = (mealType) => {
//         switch (mealType?.toLowerCase()) { // mealType null या undefined हो सकता है
//             case 'breakfast':
//                 return '☀️';
//             case 'lunch':
//                 return '🥗';
//             case 'dinner':
//                 return '🌙';
//             default:
//                 return '🍽️';
//         }
//     };

//     // डेली मील को रेंडर करने का फ़ंक्शन
//     const renderMealCard = (meal) => {
//         // null या undefined recipe को हैंडल करें
//         const { mealType, recipe } = meal;
//         const { title, description, ingredients, instructions, nutritionInfo, imageUrl } = recipe || {}; // recipe null हो सकता है

//         return (
//             <div key={meal.recipe?._id || title || Math.random()} className="bg-white border border-gray-100 rounded-xl shadow-md p-6 transition transform hover:shadow-lg hover:-translate-y-1">
//                 <div className="flex items-center mb-4">
//                     <span className="text-2xl mr-3">{getMealIcon(mealType)}</span>
//                     <h4 className="text-xl font-bold text-gray-800">{mealType}</h4>
//                 </div>

//                 {recipe ? (
//                     <>
//                         {/* Image with fallback */}
//                         {imageUrl ? (
//                             <img
//                                 src={imageUrl}
//                                 alt={title}
//                                 className="rounded-lg mb-4 w-full h-64 object-cover"
//                                 onError={(e) => {
//                                     e.target.onerror = null; // Prevent infinite loop if fallback also fails
//                                     e.target.src = "https://placehold.co/600x400/E0E0E0/ADADAD?text=Image+Not+Found";
//                                 }}
//                             />
//                         ) : (
//                             <div className="rounded-lg mb-4 w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
//                                 No Image Available
//                             </div>
//                         )}

//                         <h5 className="text-lg font-semibold text-emerald-700 mb-1">{title || 'No Title'}</h5>
//                         <p className="text-sm text-gray-500 mb-4">{description || 'No description available.'}</p>

//                         <div className="mb-4">
//                             <h6 className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-1">
//                                 <FaLeaf className="text-green-500" /> Ingredients
//                             </h6>
//                             <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-2">
//                                 {ingredients?.length > 0 ? ingredients.map((item, i) => (<li key={i}>{item}</li>)) : <li>No ingredients listed.</li>}
//                             </ul>
//                         </div>

//                         <div className="mb-4">
//                             <h6 className="text-sm font-bold text-gray-700 mb-1">Instructions</h6>
//                             <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 pl-2">
//                                 {instructions?.length > 0 ? instructions.map((step, i) => (<li key={i}>{step}</li>)) : <li>No instructions available.</li>}
//                             </ol>
//                         </div>

//                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-4">
//                             {[
//                                 { label: 'Calories', value: nutritionInfo?.calories },
//                                 { label: 'Protein', value: nutritionInfo?.protein },
//                                 { label: 'Carbs', value: nutritionInfo?.carbs },
//                                 { label: 'Fats', value: nutritionInfo?.fats },
//                             ].map((nutrient, idx) => (
//                                 <div key={idx} className="bg-green-50 rounded-lg p-3 shadow-sm">
//                                     <p className="text-xs text-gray-500">{nutrient.label}</p>
//                                     <p className="text-base font-bold text-emerald-700">
//                                         {nutrient.value || 'N/A'}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                         {/* Add Like/Share buttons for individual meals if needed */}
//                          <div className="flex justify-end items-center mt-4 space-x-3">
//                             <button className="text-red-500 hover:text-red-600 text-lg"><FaHeart /></button>
//                             <button className="text-blue-500 hover:text-blue-600 text-lg"><FaShareAlt /></button>
//                         </div>
//                     </>
//                 ) : (
//                     <p className="text-sm text-gray-500">Recipe details not found for this meal.</p>
//                 )}
//             </div>
//         );
//     };

//     // लोडिंग या एरर स्टेट्स को हैंडल करें
//     if (loading) {
//         return <div className="text-center py-10"><Loader /></div>;
//     }

//     if (error) {
//         return (
//             <div className="text-center py-20">
//                 <h2 className="text-2xl font-bold mb-4 text-red-500">Error!</h2>
//                 <p className="text-gray-600 mb-4">{error}</p>
//                 <button
//                     onClick={handleGenerateNew}
//                     className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
//                 >
//                     <FaRedo className="inline-block mr-2" /> Generate New Plan
//                 </button>
//             </div>
//         );
//     }

//     // यदि कोई मील प्लान नहीं है
//     if (!mealPlan) {
//         return (
//             <div className="text-center py-20">
//                 <h2 className="text-2xl font-bold mb-4">No meal plan found.</h2>
//                 <p className="text-gray-600 mb-4">Please generate a new meal plan to get started!</p>
//                 <button
//                     onClick={handleGenerateNew}
//                     className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition"
//                 >
//                     <FaRedo className="inline-block mr-2" /> Generate New Plan
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
//             <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-green-100">
//                 <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent text-center mb-8">
//                     Your Personalized Meal Plan
//                 </h2>

//                 <div className="flex justify-center mb-10">
//                     <button
//                         onClick={handleGenerateNew}
//                         className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
//                     >
//                         <FaRedo />
//                         Generate New Meal Plan
//                     </button>
//                 </div>

//                 <div className="bg-green-50 border border-green-200 p-5 rounded-xl mb-8 text-center shadow-sm">
//                     <p className="text-sm text-gray-500">
//                         Generated on: {new Date(mealPlan.date).toLocaleDateString()}
//                     </p>
//                     <p className="text-lg font-semibold text-gray-700">
//                         Daily Calorie Target:{' '}
//                         <span className="text-emerald-600">{mealPlan.tdee}</span> kcal
//                     </p>
//                 </div>

//                 {/* Render Daily Plan */}
//                 {mealPlan.planType === 'daily' && mealPlan.meals && mealPlan.meals.length > 0 ? (
//                     <div className="grid gap-6">
//                         {mealPlan.meals.map((meal) => renderMealCard(meal))}
//                     </div>
//                 ) : mealPlan.planType === 'daily' && mealPlan.meals && mealPlan.meals.length === 0 ? (
//                     <p className="text-center text-gray-500 text-base mt-8">
//                         No daily meal plan generated yet.
//                     </p>
//                 ) : null}


//                 {/* Render Weekly Plan */}
//                 {mealPlan.planType === 'weekly' && mealPlan.weeklyPlan && mealPlan.weeklyPlan.length > 0 ? (
//                     <div>
//                         <div className="flex justify-center flex-wrap gap-2 mb-6">
//                             {mealPlan.weeklyPlan.map((day, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => setActiveDay(index)}
//                                     className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
//                                         activeDay === index
//                                             ? 'bg-green-500 text-white shadow-md'
//                                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                                     }`}
//                                 >
//                                     {day.day}
//                                 </button>
//                             ))}
//                         </div>
//                         {mealPlan.weeklyPlan[activeDay] && mealPlan.weeklyPlan[activeDay].meals.length > 0 ? (
//                             <div className="space-y-6">
//                                 {mealPlan.weeklyPlan[activeDay].meals.map((meal) => renderMealCard(meal))}
//                             </div>
//                         ) : (
//                             <p className="text-center text-gray-500 text-base mt-8">
//                                 No meals found for {mealPlan.weeklyPlan[activeDay]?.day}.
//                             </p>
//                         )}
//                     </div>
//                 ) : mealPlan.planType === 'weekly' && mealPlan.weeklyPlan && mealPlan.weeklyPlan.length === 0 ? (
//                     <p className="text-center text-gray-500 text-base mt-8">
//                         No weekly meal plan generated yet.
//                     </p>
//                 ) : null}


//                 {/* Shopping List Button */}
//                 {mealPlan && (
//                     <div className="mt-8 text-center">
//                         <button
//                             onClick={handleGenerateShoppingList}
//                             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center mx-auto transform hover:scale-105 transition-all duration-300"
//                             disabled={loading}
//                         >
//                             <FaShoppingCart className="mr-2" />
//                             {loading ? 'Generating...' : 'Generate Shopping List'}
//                         </button>
//                     </div>
//                 )}

//                 {/* Shopping List Display */}
//                 {showShoppingList && shoppingList.length > 0 && (
//                     <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner">
//                         <h3 className="text-2xl font-bold mb-4 text-center">Shopping List</h3>
//                         <ul className="list-disc list-inside space-y-2">
//                             {shoppingList.map((item, index) => (
//                                 <li key={index} className="text-gray-700">{item}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//                 {/* Display a message if the list is empty after attempting to show it */}
//                 {showShoppingList && shoppingList.length === 0 && (
//                     <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner text-center">
//                         <p className="text-gray-500">No ingredients found for this meal plan.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MealPlanPage;






import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Loader } from '../components/Loader';
import { FaLeaf, FaRedo } from 'react-icons/fa';

const MealPlanPage = () => {
    const [mealPlan, setMealPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMealPlan = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/mealplans/me');
            setMealPlan(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to fetch meal plan.');
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
            setError(err.response?.data?.msg || 'Failed to generate new meal plan. Please check your profile data.');
            setMealPlan(null);
        } finally {
            setLoading(false);
        }
    };

    const getMealIcon = (mealType) => {
        switch (mealType.toLowerCase()) {
            case 'breakfast':
                return '☀️';
            case 'lunch':
                return '🥗';
            case 'dinner':
                return '🌙';
            default:
                return '🍽️';
        }
    };

    // Function to get safe, unique meals
    const getUniqueMeals = () => {
        const rawMeals = Array.isArray(mealPlan?.meals)
            ? mealPlan.meals
            : Array.isArray(mealPlan?.meals?.weeklyPlan)
                ? mealPlan.meals.weeklyPlan
                : [];

        const seenTitles = new Set();
        return rawMeals.filter((meal) => {
            const title = meal.recipe?.title;
            if (!title) return true; // If recipe has no title, keep it
            if (seenTitles.has(title)) return false;
            seenTitles.add(title);
            return true;
        });
    };

    const uniqueMeals = mealPlan ? getUniqueMeals() : [];

    return (
        <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-green-100">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent text-center mb-8">
                    Your Personalized Meal Plan
                </h2>

                <div className="flex justify-center mb-10">
                    <button
                        onClick={handleGenerateNew}
                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        <FaRedo />
                        {loading ? 'Generating...' : 'Generate New Meal Plan'}
                    </button>
                </div>

                {loading && <Loader />}

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded mb-6 text-center">
                        {error}
                    </div>
                )}

                {mealPlan && (
                    <div>
                        <div className="bg-green-50 border border-green-200 p-5 rounded-xl mb-8 text-center shadow-sm">
                            <p className="text-sm text-gray-500">
                                Generated on: {new Date(mealPlan.date).toLocaleDateString()}
                            </p>
                            <p className="text-lg font-semibold text-gray-700">
                                Daily Calorie Target:{' '}
                                <span className="text-emerald-600">{mealPlan.tdee}</span> kcal
                            </p>
                        </div>

                        {uniqueMeals.length > 0 ? (
                            <div className="grid gap-6">
                                {uniqueMeals.map((meal) => (
                                    <div
                                        key={meal._id}
                                        className="bg-white border border-gray-100 rounded-xl shadow-md p-6 transition transform hover:shadow-lg hover:-translate-y-1"
                                    >
                                        <div className="flex items-center mb-4">
                                            <span className="text-2xl mr-3">{getMealIcon(meal.mealType)}</span>
                                            <h4 className="text-xl font-bold text-gray-800">{meal.mealType}</h4>
                                        </div>

                                        {meal.recipe ? (
                                            <>
                                                <h5 className="text-lg font-semibold text-emerald-700 mb-1">
                                                    {meal.recipe.title}
                                                </h5>
                                                <p className="text-sm text-gray-500 mb-4">{meal.recipe.description}</p>

                                                <div className="mb-4">
                                                    <h6 className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-1">
                                                        <FaLeaf className="text-green-500" /> Ingredients
                                                    </h6>
                                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-2">
                                                        {meal.recipe.ingredients.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="mb-4">
                                                    <h6 className="text-sm font-bold text-gray-700 mb-1">Instructions</h6>
                                                    <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 pl-2">
                                                        {meal.recipe.instructions.map((step, i) => (
                                                            <li key={i}>{step}</li>
                                                        ))}
                                                    </ol>
                                                </div>

                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-4">
                                                    {[
                                                        { label: 'Calories', value: meal.recipe.nutritionInfo?.calories },
                                                        { label: 'Protein', value: meal.recipe.nutritionInfo?.protein },
                                                        { label: 'Carbs', value: meal.recipe.nutritionInfo?.carbs },
                                                        { label: 'Fats', value: meal.recipe.nutritionInfo?.fats },
                                                    ].map((nutrient, idx) => (
                                                        <div key={idx} className="bg-green-50 rounded-lg p-3 shadow-sm">
                                                            <p className="text-xs text-gray-500">{nutrient.label}</p>
                                                            <p className="text-base font-bold text-emerald-700">
                                                                {nutrient.value || 'N/A'}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-sm text-gray-500">Recipe not found.</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 text-base mt-8">
                                No meal plan found. Click "Generate New Meal Plan" to get started!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MealPlanPage;
