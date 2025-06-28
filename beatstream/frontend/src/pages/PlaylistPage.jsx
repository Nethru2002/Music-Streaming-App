// frontend/src/pages/PlaylistPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from '../api/playlistApi';
import SongList from '../components/SongList';
import Player from '../components/Player';

function PlaylistPage({ currentSong, onPlaySong }) {
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchPlaylist = async () => {
            setLoading(true);
            try {
                const { data } = await getPlaylistById(id);
                setPlaylist(data);
            } catch (error) {
                console.error("Failed to fetch playlist", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlaylist();
    }, [id]);

    if (loading) return <p>Loading playlist...</p>;
    if (!playlist) return <p>Playlist not found.</p>;

    return (
        <div className="playlist-page">
            <h2>{playlist.name}</h2>
            <SongList songs={playlist.songs} onPlay={onPlaySong} />
        </div>
    );
}

export default PlaylistPage;