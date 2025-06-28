// Load environment variables from .env file
require('dotenv').config();

// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize the Express app
const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing for all routes
// This allows your frontend (e.g., running on localhost:5173) to communicate with your backend (running on localhost:5001)
app.use(cors());

// Enable the express.json() middleware to parse incoming JSON payloads
// This is needed for POST/PUT requests where you send data (like a playlist name) in the request body
app.use(express.json());

// --- Static File Serving ---
// Serve the 'uploads' directory statically.
// This is crucial for the frontend to be able to access the music files and cover art.
// For example, a file at `backend/uploads/song1.mp3` can be accessed via the URL `http://localhost:5001/uploads/song1.mp3`
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- Database Connection ---
// Connect to the MongoDB database using the connection string from the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...')) // Log a success message if the connection is established
  .catch(err => console.log('MongoDB connection error:', err)); // Log an error if the connection fails


// --- API Routes ---
// Mount the routers for different parts of the API.
// Any request starting with '/api/songs' will be handled by the songRoutes.
app.use('/api/songs', require('./routes/songRoutes'));

// Any request starting with '/api/playlists' will be handled by the playlistRoutes.
app.use('/api/playlists', require('./routes/playlistRoutes'));


// --- Server Initialization ---
// Define the port the server will run on. Use the PORT from .env or default to 5001.
const PORT = process.env.PORT || 5001;

// Start the server and listen for incoming requests on the specified port.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));