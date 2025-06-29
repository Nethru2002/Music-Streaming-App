// backend/controllers/songController.js
const Song = require('../models/Song');
const multer = require('multer');
const path = require('path');
const mm = require('music-metadata');
const fs = require('fs');

// Ensure uploads directory and covers subdirectory exist
const uploadDir = path.join(__dirname, '..', 'uploads');
const coversDir = path.join(uploadDir, 'covers');
if (!fs.existsSync(uploadDir)){ fs.mkdirSync(uploadDir, { recursive: true }); }
if (!fs.existsSync(coversDir)){ fs.mkdirSync(coversDir, { recursive: true }); }

// Set up storage for multer. `req.file.filename` will now be available.
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage: storage }).single('audio');

// Get all songs
exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Upload a new song
exports.uploadSong = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ message: 'Error uploading file.', error: err });
        if (req.file == undefined) return res.status(400).json({ message: 'No file selected!' });

        try {
            const metadata = await mm.parseFile(req.file.path);
            const { title, artist, album, picture } = metadata.common;
            
            let coverArtPath = null;
            if (picture && picture.length > 0) {
                const cover = picture[0];
                const coverFileName = `cover-${Date.now()}.${cover.format.split('/')[1] || 'jpeg'}`;
                const coverFilePath = path.join(coversDir, coverFileName);
                fs.writeFileSync(coverFilePath, cover.data);
                // Create a relative path for the cover art
                coverArtPath = `uploads/covers/${coverFileName}`;
            }

            const newSong = new Song({
                title: title || 'Unknown Title',
                artist: artist || 'Unknown Artist',
                album: album || 'Unknown Album',
                // Save the relative path, not the absolute system path.
                filePath: `uploads/${req.file.filename}`, 
                // Ensure cover art path is URL-friendly (uses forward slashes)
                coverArtPath: coverArtPath ? coverArtPath.replace(/\\/g, '/') : null
            });

            const savedSong = await newSong.save();
            res.status(201).json(savedSong);

        } catch (error) {
            console.error('Error processing file:', error);
            fs.unlinkSync(req.file.path);
            res.status(500).json({ message: 'Error processing file metadata.' });
        }
    });
};

// Search songs
exports.searchSongs = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: 'Query parameter "q" is required.' });
        }

        const songs = await Song.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { artist: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};