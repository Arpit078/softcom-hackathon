const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `
I want to parse this query: I wanna open a new Airlines company in India. Only return the json object in response, don't write any thing other than the required response. I will use json.parse on your response.
Please extract the tokens in this format:
{
    "industry": "",
    "aim": "",
    "competitors": "",
    "futureTrends": ""
}
`;

// Wrapping in an async function
async function generateContent() {
    try {
        const result = await model.generateContent(prompt);
        console.log(await result.response.text());
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

// Call the async function
generateContent();
