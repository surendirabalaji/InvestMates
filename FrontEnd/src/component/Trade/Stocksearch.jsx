import React from 'react';
import styles from './Stocksearch.module.css';
import InfoItem from './InfoItem';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';

const Stocksearch = ({onSymbolChange, onCompanyChange}) => {
  const [query, setQuery] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [stockInfo, setStockInfo] = useState([
    { label: "Company Name", value: "Amazon Inc." },
    { label: "Current Price", value: "$150.00" },
    { label: "Market Cap", value: "$2.5T" },
    { label: 'Description', value: "Amazon is the leading online retailer and marketplace for third party sellers. Retail related revenue represents approximately 75% of total, followed by Amazon Web Services cloud computing, storage, database, and other offerings (15%), advertising services (5% to 10%), and other the remainder. International segments constitute 25% to 30% of Amazon's non-AWS sales, led by Germany, the United Kingdom, and Japan." },
  ]);
  const [suggestions, setSuggestions] = useState([]);

  const changeDetails = async (symbol) => {
    try {
      const response = await axios.get(`https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=JUssIWf2KBwBlfELiiQvNwh5YMqj35MI`);
      const data = response.data.results;
      setStockInfo([
        { label: "Company Name", value: data.name },
        { label: "Stock Id:", value: symbol },
        { label: "Description", value: data.description }
      ]);
      onCompanyChange(data.name)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (query.length === 0 || selectedSuggestion) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=QLAatGaYj5VRLfrvPbcFEmQn4FBUNqSz`);
        const data = response.data;

        const sortedSuggestions = data
          .map(item => ({
            ...item,
            matchScore: calculateMatchScore(query, item.symbol, item.name)
          }))
          .sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
              return b.matchScore - a.matchScore;
            }
            return a.symbol.localeCompare(b.symbol);
          })
          .slice(0, 10);

        setSuggestions(sortedSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [query, selectedSuggestion]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.searchContainer}`)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const calculateMatchScore = (query, symbol, name) => {
    const lowerQuery = query.toLowerCase();
    const lowerSymbol = symbol.toLowerCase();
    const lowerName = name.toLowerCase();

    let score = 0;

    if (lowerSymbol === lowerQuery) {
      score += 100;
    } else if (lowerSymbol.startsWith(lowerQuery)) {
      score += 75;
    } else if (lowerSymbol.includes(lowerQuery)) {
      score += 50;
    }

    if (lowerName.startsWith(lowerQuery)) {
      score += 25;
    } else if (lowerName.includes(lowerQuery)) {
      score += 10;
    }

    return score;
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSelectedSuggestion(null); 
  };

  const handleSuggestionClick = (symbol) => {
    setSuggestions([]);
    setQuery(symbol);
    setSelectedSuggestion(true); 
    changeDetails(symbol);
    onSymbolChange(symbol);
  };

  return (
    <section className={styles.frame}>
      <h2 className={styles.title} style={{ paddingBottom: '1rem' }}>Stock Selection</h2>
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchPlaceholder}
            placeholder="Search for a company or symbol"
            value={query}
            onChange={handleInputChange}
            aria-label="Search for a company or symbol"
          />
          {suggestions.length > 0 && query.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions.map((item) => (
                <li
                  key={item.symbol}
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(item.symbol)}
                >
                  {item.symbol} - {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div style={{ paddingTop: '2rem' }}>
        {stockInfo.map((item, index) => (
          <InfoItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
      {query === 'AMZN' && (
      <>
          <h6 className={styles.infoLabel}>News</h6>
          <a 
              style={{ textDecoration: 'none' }} 
              href='https://markets.businessinsider.com/news/stocks/wait-for-amazon-stock-to-hit-this-critical-level-before-you-buy-1033695668' 
              className={styles.news}
          >
              Wait for Amazon Stock to Hit This Critical Level Before You Buy
          </a>
      </>
      )}
    </section>
  );
};

export default Stocksearch;