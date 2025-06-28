// frontend/src/components/PlaylistsSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlaylists, createPlaylist } from '../api/playlistApi';

function PlaylistsSidebar() {
    const [playlists, setPlaylists] = useState([]);
    
    const fetchPlaylists = async () => {
        const { data } = await getPlaylists();
        setPlaylists(data);
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleCreatePlaylist = async () => {
        const name = prompt('Enter new playlist name:');
        if (name) {
            await createPlaylist(name);
            fetchPlaylists(); // Refresh list
        }
    };

    return (
        <aside className="sidebar">
            <h3>My Playlists</h3>
            <button onClick={handleCreatePlaylist}>+ New Playlist</button>
            <nav>
                <ul>
                    {playlists.map(p => (
                        <li key={p._id}>
                            <Link to={`/playlists/${p._id}`}>{p.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
export default PlaylistsSidebar;