const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const amqp = require('amqplib');

const QUEUE_NAME = 'user_queries'; // RabbitMQ queue name

// Function to connect to RabbitMQ and send messages
async function sendToQueue(query) {
  try {
    const connection = await amqp.connect('amqp://localhost'); // RabbitMQ server URL
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    // Send the user query to the queue
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(query)), {
      persistent: true, // Ensure message is not lost
    });

    console.log('Sent to queue:', query);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error sending to RabbitMQ:', error);
  }
}

// Protected route to get user profile
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Updated query route
router.post("/query", authMiddleware, async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ success: false, message: 'Query is required.' });
  }

  try {
    // Send the query to RabbitMQ
    await sendToQueue({ query });

    res.status(200).json({ success: true, message: 'Query received and processing started.' });
  } catch (error) {
    console.error("Error in processing query:", error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
