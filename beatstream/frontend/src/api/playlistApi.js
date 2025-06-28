// frontend/src/api/playlistApi.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/playlists`;

export const getPlaylists = () => axios.get(API_URL);
export const getPlaylistById = (id) => axios.get(`${API_URL}/${id}`);
export const createPlaylist = (name) => axios.post(API_URL, { name });
export const addSongToPlaylist = (playlistId, songId) => axios.post(`${API_URL}/${playlistId}/songs`, { songId });