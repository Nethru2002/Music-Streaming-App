// backend/models/Song.js
const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, default: 'Unknown Album' },
    filePath: { type: String, required: true },
    coverArtPath: { type: String }, // <-- ADD THIS LINE
});

module.exports = mongoose.model('Song', SongSchema);