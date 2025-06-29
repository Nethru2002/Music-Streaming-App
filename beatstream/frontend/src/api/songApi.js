// frontend/src/api/songApi.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/songs`;

export const getSongs = () => {
    return axios.get(API_URL);
};

export const uploadSong = (formData) => {
    return axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const searchSongs = (query) => {
    return axios.get(`${API_URL}/search?q=${query}`);
};