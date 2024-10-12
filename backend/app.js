const express = require('express');
const app = express();
const port = 3000;
const performSearch = require("./worker/search.js")
const scrapeUrls = require("./worker/scraper.js")
const correctGrammar = require("./worker/summariser.js")
// Define a route
app.post('/generate_data', async (req, res) => { // handles user 
  let query = req.query;
  let urls = await performSearch(query);
  let resultObj = await scrapeUrls(urls);
  let correct = await correctGrammar(resultObj);
  res.send({data : JSON.parse(correct)});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
