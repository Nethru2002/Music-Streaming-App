// backend/routes/songRoutes.js
const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('/search', songController.searchSongs); // <-- ADD THIS LINE
router.get('/', songController.getAllSongs);
router.post('/upload', songController.uploadSong);

module.exports = router;