// Test script to verify Gemini API is working
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiAPI() {
    console.log('Testing Gemini API...\n');
    
    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
        console.error('❌ ERROR: GEMINI_API_KEY not found in .env file');
        return;
    }
    
    console.log('✓ API Key found');
    console.log(`API Key: ${process.env.GEMINI_API_KEY.substring(0, 10)}...`);
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try different model names
    const modelsToTry = [
        'gemini-2.0-flash',
        'gemini-2.5-flash',
        'gemini-2.0-flash-001'
    ];
    
    for (const modelName of modelsToTry) {
        try {
            console.log(`\nTrying model: ${modelName}...`);
            
            const model = genAI.getGenerativeModel({ 
                model: modelName,
                generationConfig: {
                    temperature: 0.9,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            });
            
            const prompt = 'Say "Hello" in JSON format: {"message": "Hello"}';
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            
            console.log(`✅ SUCCESS with ${modelName}!`);
            console.log('Response:', text);
            console.log(`\n🎉 Use this model name in your code: "${modelName}"`);
            return;
            
        } catch (error) {
            console.log(`❌ Failed with ${modelName}: ${error.message}`);
        }
    }
    
    console.error('\n❌ All models failed. Your API key might be invalid or expired.');
    console.error('\n💡 Solution:');
    console.error('   1. Go to https://aistudio.google.com/app/apikey');
    console.error('   2. Create a new API key');
    console.error('   3. Update GEMINI_API_KEY in your .env file');
}

testGeminiAPI();
