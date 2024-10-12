const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
if (!process.env.GEMINI) {
    console.error("GEMINI API key is not set in .env file");
} else {
    console.log("GEMINI API key loaded successfully");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Wrapping in an async function
async function tokenize(query) {
    const prompt = `
        I want to parse this query: ${query}. Only return the json object in response, don't write anything other than the required response. I will use JSON.parse on your response. Limit 1 query per section.
        Please generate arrays of search queries in the following format:
        {
            "summary": [],
            "competitor_and_market_force_analysis": [],
            "industry_specific_and_geographical_insights": [],
            "trends_prediction": [],
            "SWOT": [],
            "PESTLE": []
        }
    `;
    try {
        const result = await model.generateContent(prompt);
        const res = await result.response.text();
        const jsonResponse = JSON.parse(res);  // Parse the response into a JSON object
        return jsonResponse; // Return the parsed object
    } catch (error) {
        console.error("Error generating content:", error);
        return null; // Return null or an empty object on error
    }
}

// Export the tokenize function for use in other modules
module.exports = tokenize;

// Optionally, you can call the function directly for testing purposes
// tokenize("future of aviation industry").then(console.log);
