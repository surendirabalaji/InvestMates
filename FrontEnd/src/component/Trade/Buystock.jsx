import React, { useState, useEffect } from 'react';
import InfoItem from './InfoItem';
import styles from './Stocksearch.module.css';
import axios from 'axios';

const buy_url = "http://localhost:8080/portfolio/buy";
const apiKey = 'JUssIWf2KBwBlfELiiQvNwh5YMqj35MI'

const Buystock = ({ symbol, company }) => {
  const [shares, setShares] = useState('');
  const [stockInfo, setStockInfo] = useState([
    { label: "Stock Id", value: symbol || "AMZN" },
    { label: "Company Name", value: company || "Amazon Inc." },
    { label: "Current Price", value: "$150" },
  ]);

  useEffect(() => {
    if (symbol) {
      fetchStockInfo(symbol, company);
    }
  }, [symbol, company]);

  const fetchStockInfo = async (stockSymbol, stockCompany) => {
    try {
      const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/prev`, {
        params: {
          adjusted: true,
          apiKey: apiKey
        }
      });
      const data = response.data;
      setStockInfo([
        { label: "Stock Id", value: stockSymbol },
        { label: "Company Name", value: stockCompany || "Unknown Company" },
        { label: "Current Price", value: `$${data.results[0].c}` },
      ]);
    } catch (error) {
      console.error('Error fetching stock info:', error);
      // Optionally handle errors and update UI accordingly
    }
  };

  const handleBuy = () => {
    if (shares) {
      const currentPrice = parseFloat(stockInfo[2].value.replace('$', ''));
      
      axios.post(buy_url, null, {
        params: {
          tickerSymbol: symbol,
          quantity: parseInt(shares),
          pricePerShare: currentPrice,
        }
      })
        .then((res) => {
          console.log('Response:', res.data);
          alert('Purchase successful!');
        })
        .catch((error) => {
          console.error('Error:', error.message);
          alert('Error purchasing stock.');
        });

      handleReset();
    } else {
      alert('Please enter the number of shares to buy');
    }
  };

  const handleReset = () => {
    setShares('');
  };

  return (
    <div className={styles.outerContainer}>
      <form className={styles.buyContainer} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.itemsWrapper}>
          {stockInfo.map((item, index) => (
            <div key={index} className={styles.itemInside}>
              <InfoItem label={item.label} value={item.value} />
            </div>
          ))}
          <div className={styles.itemInside}>    
            <h3 className={styles.infoLabel}>Shares</h3>
            <input 
              type='number' 
              required 
              placeholder='0' 
              className={styles.inputNumber} 
              style={{ maxWidth: '7rem', paddingInline: '0.5rem', paddingBlock: '0.2rem', borderColor: 'black' }}
              value={shares}
              onChange={(e) => setShares(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.button} onClick={handleBuy}>Buy</button>
          <button type="button" className={styles.button} onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Buystock;
