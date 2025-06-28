// frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import SongList from '../components/SongList';
import { getSongs } from '../api/songApi';

function HomePage({ onPlaySong }) {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSongs = async () => {
            setLoading(true);
            try {
                const response = await getSongs();
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSongs();
    }, []);

    if (loading) return <p>Loading library...</p>;

    return (
        <div className="home-page">
            <h2>All Songs</h2>
            <SongList songs={songs} onPlay={onPlaySong} />
        </div>
    );
}

export default HomePage;