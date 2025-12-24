const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: 'gemini-2.5-flash',
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    }
});

const calculateTDEE = (user) => {
    let bmr;
    if (user.gender === 'male') {
        bmr = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
    } else {
        bmr = 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
    }
    const activityMultipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very active': 1.9
    };
    return Math.round(bmr * activityMultipliers[user.activityLevel]);
};

exports.generateMealPlan = async (user, planType) => {
    const tdee = calculateTDEE(user);
    let targetCalories;
    if (user.goal === 'lose') {
        targetCalories = tdee - 500;
    } else if (user.goal === 'gain') {
        targetCalories = tdee + 500;
    } else {
        targetCalories = tdee;
    }
    const uniqueSeed = new Date().getTime();

    
    const dietaryText = user.isVegetarian ? 'The meals must be strictly vegetarian.' : 'The meals can include meat, poultry, and fish.';
    
    // Prompt structure for daily plan
        let dailyPlanPrompt = `
        Create a 3-meal plan for a day (breakfast, lunch, and dinner).
        The **total daily calorie intake for all three meals combined must be approximately ${targetCalories} kcal.**
        Distribute calories reasonably across meals (e.g., breakfast: 25-30%, lunch: 35-40%, dinner: 30-35%).
        
        ${dietaryText}
        Each meal should have a realistic recipe with ingredients and step-by-step instructions.
        
        At least one meal must feature a traditional Indian dish (e.g., poha, idli, dal, roti, curry, biryani, dosa, etc.).
        Ensure cuisines are varied — mix Indian and non-Indian meals in the day.
        Do NOT repeat any recipe in the same plan.

        For each recipe, include a high-quality, relevant image URL from Unsplash or Pexels.
        
        User Profile:
        - Gender: ${user.gender}
        - Age: ${user.age}
        - Weight: ${user.weight} kg
        - Height: ${user.height} cm
        - Activity Level: ${user.activityLevel}
        - Goal: ${user.goal}

        CRITICAL: Return ONLY valid JSON. No comments, no explanations, no markdown.
        
        Return a JSON array with exactly 3 objects following this structure:
        [
            {
                "mealType": "Breakfast",
                "recipe": {
                    "title": "Recipe Name",
                    "description": "Short description",
                    "ingredients": ["ingredient 1", "ingredient 2"],
                    "instructions": ["step 1", "step 2"],
                    "nutritionInfo": {
                        "calories": 400,
                        "protein": 20,
                        "carbs": 50,
                        "fats": 15
                    },
                    "imageUrl": "https://images.unsplash.com/photo-example.jpg"
                }
            }
        ]
    `;

    // Prompt structure for weekly plan
    let weeklyPlanPrompt = `
        Create a balanced 7-day (Monday to Sunday) meal plan for a person with the following details.
        The **total daily calorie intake for each day must be as close as possible to ${targetCalories} kcal.**
        Each day's plan should consist of 3 meals: breakfast, lunch, and dinner.
        
        ${dietaryText}
        Each meal should have a realistic recipe with ingredients and step-by-step instructions.
        
        For each recipe, include a high-quality, relevant image URL from a reliable source. The image URL should be direct and link to the image file itself (e.g., ending in .jpg, .png).

        User Profile:
        - Gender: ${user.gender}
        - Age: ${user.age}
        - Weight: ${user.weight} kg
        - Height: ${user.height} cm
        - Activity Level: ${user.activityLevel}
        - Goal: ${user.goal}
        
        The recipes must be varied across the week. Do not repeat recipes. Unique ID: ${uniqueSeed}
        
        Provide the output as a single, clean JSON object with a 'weeklyPlan' property. Do not include any additional text, markdown, or explanations outside of the JSON object.
        
        The JSON structure MUST be an object with a single property:
        - "weeklyPlan": [
            {
                "day": "Monday",
                "meals": [
                    {
                        "mealType": "Breakfast",
                        "recipe": { ... }
                    },
                    {
                        "mealType": "Lunch",
                        "recipe": { ... }
                    },
                    {
                        "mealType": "Dinner",
                        "recipe": { ... }
                    }
                ]
            },
            // ... similar structure for Tuesday to Sunday
        ]
    `;

    try {
        const prompt = planType === 'weekly' ? weeklyPlanPrompt : dailyPlanPrompt;
        const result = await model.generateContent(prompt);
        
        // Handle the response properly
        const response = result.response;
        let text = response.text();
        
        // Clean up the response text
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        let mealPlanData;
        try {
            mealPlanData = JSON.parse(text);
        } catch (parseError) {
            console.error('Failed to parse JSON from Gemini API:', parseError.message);
            console.error('Gemini API raw response:', text);
            throw new Error('Could not parse JSON response from Gemini API.');
        }

        // Return the appropriate data structure based on plan type
        if (planType === 'weekly') {
             // Validate weekly plan structure
            if (!mealPlanData.weeklyPlan || !Array.isArray(mealPlanData.weeklyPlan) || mealPlanData.weeklyPlan.length !== 7) {
                console.error('Generated meal plan is not a valid weekly plan:', mealPlanData);
                throw new Error('Generated weekly meal plan is not valid.');
            }
            return { tdee, meals: mealPlanData };
        } else {
            // Validate daily plan structure
            if (!Array.isArray(mealPlanData) || mealPlanData.length !== 3) {
                console.error('Generated meal plan is not a valid daily plan:', mealPlanData);
                throw new Error('Generated daily meal plan is not valid.');
            }
            return { tdee, meals: mealPlanData };
        }

    } catch (error) {
        console.error('Error generating meal plan with Gemini API:', error);
        
        // Provide more specific error messages
        if (error.message && error.message.includes('API key')) {
            throw new Error('Invalid or expired Gemini API key. Please check your GEMINI_API_KEY in .env file.');
        } else if (error.message && error.message.includes('quota')) {
            throw new Error('Gemini API quota exceeded. Please try again later or check your API limits.');
        } else if (error.message && error.message.includes('parse')) {
            throw new Error('Failed to parse AI response. The AI returned invalid data.');
        } else {
            throw new Error(`Failed to generate meal plan with AI: ${error.message}`);
        }
    }
};