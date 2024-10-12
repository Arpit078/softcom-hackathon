const { search, OrganicResult, DictionaryResult } = require('google-sr');
const tokenize = require('./tokenize.js'); // Importing the tokenize function

// Define an async function to perform the search
async function performSearch(query) {
    // Await the tokenize function to get the search queries
    const searchQueries = await tokenize(query); // Make sure to await the function
    let objOfUrls = {}; // Initialize the object to store URLs

    // Ensure searchQueries is an object
    if (searchQueries && typeof searchQueries === 'object') {
        // Iterate over each section in the searchQueries object
        for (const section in searchQueries) {
            objOfUrls[section] = []; // Initialize the array for each section
            
            // Iterate over each query in the section
            for (const q of searchQueries[section]) {
                try {
                    const queryResult = await search({
                        query: q,
                        resultTypes: [OrganicResult, DictionaryResult],
                        requestConfig: {
                            params: {
                                // Enable "safe mode"
                                safe: 'active'
                            },
                        },
                    });

                    // Check if queryResult has results and push the first result link
                    if (queryResult && queryResult.length > 0) {
                        objOfUrls[section].push(queryResult[0].link); // Push the first result's link
                    } else {
                        console.warn(`No results found for query: ${q}`);
                    }
                } catch (error) {
                    console.error("Error during search:", error);
                }
            }
        }
        return objOfUrls; // Return the object of URLs
    } else {
        console.error("Invalid search queries:", searchQueries);
    }
}

// Call the async function to execute the search
performSearch("future of ai").then((objOfUrls) => {
    console.log(objOfUrls); // Output all collected URLs after the search completes
});

// Export the performSearch function for use in other modules
module.exports = performSearch; // Ensure this line is active if you need to import it elsewhere
