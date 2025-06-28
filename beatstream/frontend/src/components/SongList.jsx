// frontend/src/components/SongList.jsx
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { getPlaylists, addSongToPlaylist } from '../api/playlistApi';

const API_URL = import.meta.env.VITE_API_URL;

function SongList({ songs, onPlay }) {
    const [playlists, setPlaylists] = useState([]);
    const [showPlaylistsForSong, setShowPlaylistsForSong] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const { data } = await getPlaylists();
            setPlaylists(data);
        };
        fetchPlaylists();
    }, []);

    const handleAddClick = (songId, e) => {
        e.stopPropagation(); // Prevent song from playing
        setShowPlaylistsForSong(songId === showPlaylistsForSong ? null : songId);
    };

    const handleAddToPlaylist = async (playlistId, songId, e) => {
        e.stopPropagation();
        try {
            await addSongToPlaylist(playlistId, songId);
            alert('Song added to playlist!');
            setShowPlaylistsForSong(null);
        } catch (error) {
            alert('Failed to add song. It might already be in the playlist.');
        }
    };
    
    if (!songs.length) return <p>No songs found.</p>;

    return (
        <div className="song-list">
            {songs.map((song) => (
                <div key={song._id} className="song-item-container">
                    <div className="song-item" onClick={() => onPlay(song)}>
                        <img
                            src={song.coverArtPath ? `${API_URL}/${song.coverArtPath.replace(/\\/g, '/')}` : '/default-cover.png'}
                            alt={song.title}
                            className="song-cover-art"
                        />
                        <div className="song-details">
                            <p><strong>{song.title}</strong></p>
                            <p>{song.artist}</p>
                        </div>
                        <button className="add-to-playlist-btn" onClick={(e) => handleAddClick(song._id, e)}>
                            <FaPlus />
                        </button>
                    </div>
                    {showPlaylistsForSong === song._id && (
                        <div className="playlist-dropdown">
                            {playlists.length > 0 ? playlists.map(p => (
                                <div key={p._id} onClick={(e) => handleAddToPlaylist(p._id, song._id, e)}>
                                    {p.name}
                                </div>
                            )) : <p>No playlists yet. Create one!</p>}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default SongList;