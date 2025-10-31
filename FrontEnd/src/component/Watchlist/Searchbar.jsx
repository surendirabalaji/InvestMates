import React, { useState } from 'react';
import { fetchStockData } from './AlphaVantageAPI.js';

function Searchbar({ onAddToWatchlist }) {
    const [input, setInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (!input) {
            setErrorMessage("Please enter a ticker symbol.");
            return;
        }
        const apiKey = '5DN8AP230Z9MACDL';
        try {
            const stockDetails = await fetchStockData(input, apiKey);
            if(stockDetails) {
                console.log(stockDetails);
                onAddToWatchlist(stockDetails);
                setInput('');
                setErrorMessage('');
            } else {
                setErrorMessage("Ticker does not exist or data unavailable.");
            }
            
        } catch (error) {
            console.error('Error fetching details:', error);
            setErrorMessage("Failed to fetch data. Please try again.");
        }
    };

    

    return (
        <form className="d-flex search-btn" role="search" onSubmit={handleSearch}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search for a ticker"
                aria-label="Search"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Add</button>
            {errorMessage && <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>}
        </form>
    )
}

export default Searchbar;
