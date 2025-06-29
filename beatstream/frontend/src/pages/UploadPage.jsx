// frontend/src/pages/UploadPage.jsx
import React, { useState } from 'react';
import { uploadSong } from '../api/songApi';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        setLoading(true); 
        setMessage('Uploading...'); 

        const formData = new FormData();
        formData.append('audio', file);

        try {
            await uploadSong(formData);
            setMessage('Song uploaded successfully! Redirecting...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            setMessage('Error uploading song. Please try again.');
            console.error('Upload error:', error);
            setLoading(false);
        }
    };

    return (
        <div className="upload-page">
            <h2>Upload Music</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".mp3,.m4a" onChange={handleFileChange} disabled={loading} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UploadPage;