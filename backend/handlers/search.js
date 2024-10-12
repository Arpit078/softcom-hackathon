const { search, OrganicResult, DictionaryResult, ResultTypes } = require('google-sr');

// Define an async function to perform the search
async function performSearch() {
    try {
        const queryResult = await search({
            query: "political factors affecting aviation",
            resultTypes: [OrganicResult, DictionaryResult],
            requestConfig: {
                params: {
                    // enable "safe mode"
                    safe: 'active'
                },
            },
        });

        // Output the results
        console.log(queryResult);
        console.log(queryResult[0].type === ResultTypes.OrganicResult); // true
    } catch (error) {
        console.error("Error during search:", error);
    }
}

// Call the async function to execute the search
performSearch();
