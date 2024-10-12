const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function correctGrammar(data) {
  const correctedData = {}; // Object to hold corrected sections

  // Dynamically get sections from the data keys
  const sections = Object.keys(data);

  for (const section of sections) {
    // Prepare the prompt for grammatical correction
    const prompt = `
    Correct the grammar of the following text and only include the corrected text in your response:
    "${data[section]}"
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;

      // Check if response has text and extract it
      if (response && response.text) {
        const correctedText = response.text(); // Call text() to get the corrected text
        correctedData[section] = correctedText; // Store the corrected text
      } else {
        console.warn(`No valid response for section: ${section}`);
        correctedData[section] = "No correction generated."; // Default value if no correction is generated
      }
    } catch (error) {
      console.error(`Error correcting grammar for ${section}:`, error);
      correctedData[section] = "Error correcting grammar."; // Default value in case of error
    }
  }

  return JSON.stringify(correctedData); // Return the corrected data as a JSON string
}

// // Example usage with provided data
// const data = {
//   section1: `bsdasdas`,
//   section2: `This is an example of poor grammar. it should be corrected.`,
//   section3: `Another example with missing punctuation`
// };

// // Execute the grammar correction
// correctGrammar(data).then((correctedSectionsJson) => {
//   // Parse the JSON string to a JavaScript object
//   const correctedSections = JSON.parse(correctedSectionsJson);
//   console.log("Corrected sections:", correctedSections);
// }).catch((error) => {
//   console.error("Error in correcting grammar:", error);
// });

module.exports = correctGrammar;
