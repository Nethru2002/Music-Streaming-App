// frontend/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import PlaylistPage from './pages/PlaylistPage';
import SearchPage from './pages/SearchPage';
import PlaylistsSidebar from './components/PlaylistsSidebar';
import Player from './components/Player';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
    const [currentSong, setCurrentSong] = useState(null);

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    return (
        <Router>
            <div className="app-container">
                <header>
                    <Link to="/" className="logo">BeatStream</Link>
                    <SearchBar />
                    <nav className="main-nav">
                        <Link to="/">Home</Link>
                        <Link to="/upload">Upload</Link>
                    </nav>
                </header>
                
                <div className="app-body">
                    <PlaylistsSidebar />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage onPlaySong={handlePlaySong} />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route path="/playlists/:id" element={<PlaylistPage onPlaySong={handlePlaySong} />} />
                            <Route path="/search" element={<SearchPage onPlaySong={handlePlaySong} />} />
                        </Routes>
                    </main>
                </div>
                
                <Player song={currentSong} />
            </div>
        </Router>
    );
}

export default App;