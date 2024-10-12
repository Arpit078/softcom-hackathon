const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Wrapping in an async function
async function tokenize(query) {
    const prompt = `
        I want to parse this query: ${query}. Only return the json object in response, don't write any thing other than the required response. I will use json.parse on your response.
        Please generated arrays of search queries for in the following format.
        {
            "summary": [],
            "competitor_and_market_force_analysis": [],
            "industry_specific_and_geographical_insights":[],
            "trends_prediction":[],
            "SWOT" : [],
            "PESTLE":[]
        }
        `;
    try {
        const result = await model.generateContent(prompt);
        res  = await result.response.text();
        console.log(res)
        return res;
    } catch (error) {
        console.error("Error generating content:", error);
    }
}
tokenize("future of aviation industry")