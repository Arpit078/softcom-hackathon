const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cors = require('cors');

dotenv.config();
const app = express();
const port = 3000;
const performSearch = require("./worker/search.js")
const scrapeUrls = require("./worker/scraper.js")
const correctGrammar = require("./worker/summariser.js")
// Middleware
app.use(cors());
app.use(express.json());

// Define a route
app.post('/generate_data', async (req, res) => { // handles user 
  let query = req.body.query;
  let urls = await performSearch(query);
  let resultObj = await scrapeUrls(urls);
  let correct = await correctGrammar(resultObj);
  res.send({data : JSON.parse(correct)});
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
/*
 1. handles user queries.
        - user query ko queue
        - db me status update report ki generating. unique id : status
            rabbitmq.com/tutorials/tutorial-one-javascript
        - cron scrape karti hai 
        - update db to generated.
 2. handles data for generated page.
        - db se unique id ka data nikalke json me return.
3.  handle post requests jo db me update karengi.
*/
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
