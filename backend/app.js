const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
/*
 1. handles user queries.
        - user query ko queue
        - db me status update report ki generating. unique id : status
        - cron scrape karti hai 
        - update db to generated.
 2. hanles data for generated page.
        - db se unique id ka data nikalke json me return.
3.  handle post requests jo db me update karengi.
*/
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
