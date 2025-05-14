const express = require('express');
const cors = require('cors');
const db = require('./db');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Node.js MySQL API Server Running');
});

// Start server
const startServer = async () => {
  try {
    // Initialize database connection
    await db.connect();
    console.log('Database connection established');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  try {
    await db.disconnect();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});