// backend/routes/songRoutes.js
const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('/search', songController.searchSongs);
router.get('/', songController.getAllSongs);
router.post('/upload', songController.uploadSong);

module.exports = router;