// frontend/src/components/Player.jsx
import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
}

function Player({ song }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (song) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(e => console.error("Playback failed", e));
        } else {
            setIsPlaying(false);
        }
    }, [song]);

    const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
    const handleLoadedMetadata = () => setDuration(audioRef.current.duration);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };
    
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };
    
    const toggleMute = () => {
        const newMutedState = !isMuted;
        audioRef.current.muted = newMutedState;
        setIsMuted(newMutedState);
        if(!newMutedState) { 
            if (volume === 0) setVolume(0.5);
        }
    };

    const songUrl = song ? `${API_URL}/${song.filePath.replace(/\\/g, '/')}` : '';
    const coverUrl = song && song.coverArtPath ? `${API_URL}/${song.coverArtPath.replace(/\\/g, '/')}` : '/default-cover.png';

    if (!song) {
        return <div className="player-placeholder">Select a song to play</div>;
    }

    return (
        <div className="player active">
            <audio
                ref={audioRef}
                src={songUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                volume={volume}
                muted={isMuted}
            />
            <div className="player-info">
                <img src={coverUrl} alt="cover" className="player-cover-art" />
                <div>
                    <p><strong>{song.title}</strong></p>
                    <p>{song.artist}</p>
                </div>
            </div>
            <div className="player-controls">
                <button onClick={togglePlayPause} className="play-pause-btn">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <div className="time-controls">
                    <span>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="seek-bar"
                    />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
            <div className="volume-controls">
                <button onClick={toggleMute}>
                    {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-bar"
                />
            </div>
        </div>
    );
}

export default Player;