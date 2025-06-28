// frontend/src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchSongs } from '../api/songApi';
import SongList from '../components/SongList';

function SearchPage({ onPlaySong }) {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        if (!query) return;
        const performSearch = async () => {
            setLoading(true);
            try {
                const { data } = await searchSongs(query);
                setSongs(data);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setLoading(false);
            }
        };
        performSearch();
    }, [query]);

    return (
        <div className="search-page">
            <h2>Search Results for "{query}"</h2>
            {loading ? <p>Searching...</p> : <SongList songs={songs} onPlay={onPlaySong} />}
        </div>
    );
}

export default SearchPage;