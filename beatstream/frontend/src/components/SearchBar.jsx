// frontend/src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query.trim()}`);
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search for songs or artists..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit"><FaSearch /></button>
        </form>
    );
}

export default SearchBar;