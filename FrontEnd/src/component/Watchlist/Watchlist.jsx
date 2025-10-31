// Watchlist.jsx
import React, { useState } from 'react';
import './Watchlist.css';
import Searchbar from './Searchbar';
import Filterbar from './Filterbar';
import WatchlistTable from './WatchlistTable';

const Watchlist = () => {
  const [stocks, setStocks] = useState([
    { ticker: "AAPL", price: "150.00", change: "1.00", percent_change: "0.67%", high: "152.00", low: "148.00", volume: "98000000" },
    { ticker: "MSFT", price: "280.00", change: "-0.50", percent_change: "-0.18%", high: "282.00", low: "279.00", volume: "75000000" },
    // Add more entries as needed
  ]);

  const onAddToWatchlist = (stock) => {
    if (stock && stock.symbol) { 
      setStocks(prev => [...prev, {
        ticker: stock.symbol,
        price: parseFloat(stock.price).toFixed(2), // Ensure consistent formatting
        change: stock.change,
        percent_change: stock.changePercent,
        high: stock.high,
        low: stock.low,
        volume: stock.volume
      }]);
    } else {
      console.error('Invalid stock data:', stock);
      // Optionally show an error message to the user
    }
  };

return (
    <div className="watchlists-container">
      <Searchbar onAddToWatchlist={onAddToWatchlist} />
      <Filterbar />
      <WatchlistTable watchlist={stocks} />
    </div>
  );
}

export default Watchlist;
