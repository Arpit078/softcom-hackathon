const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Check database connection
const checkConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Database connection established successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Call the function to check connection
checkConnection();

module.exports = prisma;
