// backend/controllers/playlistController.js
const Playlist = require('../models/Playlist');
const Song = require('../models/Song');

// Create a new playlist
exports.createPlaylist = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Playlist name is required' });

    const newPlaylist = new Playlist({ name });
    try {
        const savedPlaylist = await newPlaylist.save();
        res.status(201).json(savedPlaylist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all playlists
exports.getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find().sort({ createdAt: -1 });
        res.json(playlists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single playlist by ID with its songs populated
exports.getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('songs');
        if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a song to a playlist
exports.addSongToPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        const song = await Song.findById(req.body.songId);

        if (!playlist || !song) {
            return res.status(404).json({ message: 'Playlist or Song not found' });
        }

        // Avoid adding duplicates
        if (playlist.songs.includes(song._id)) {
            return res.status(400).json({ message: 'Song already in playlist' });
        }

        playlist.songs.push(song._id);
        await playlist.save();
        res.json(playlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};