import React, { useState, useEffect } from 'react';
import InfoItem from './InfoItem';
import styles from './Stocksearch.module.css';
import axios from 'axios';

const stockInfoInitial = [
    { label: "Company Name", value: "AMZN" },
    { label: "Number of Shares", value: "500" },
    { label: "Current Price", value: "$177" }
];

const sell_url = "http://localhost:8080/portfolio/sell";
const stockInfoUrl = "http://localhost:8080/portfolio/holdingByTicker";
const currentPriceUrl = "https://api.polygon.io/v2/aggs/ticker/";

const Sellstock = ({ symbol, company }) => {
    const [shares, setShares] = useState('');
    const [stockInfo, setStockInfo] = useState(stockInfoInitial);
    const [priceChange, setPriceChange] = useState('');
    const [percentageChange, setPercentageChange] = useState('0%');
    const [currentPrice, setCurrentPrice] = useState('Loading...');
    const [maxShares, setMaxShares] = useState(null);

    useEffect(() => {
        if (!symbol || !company) return;

        axios.get(stockInfoUrl, { params: { ticker: symbol || 'AMZN'} })
            .then((response) => {
                const data = response.data;

                if (!data || !data.averagePrice || !data.quantity) {
                    setStockInfo([
                        { label: "Company Name", value: company },
                        { label: "Number of Shares", value: "NA" },
                        { label: 'Current Price', value: `NA` }
                    ]);
                    setMaxShares(null);
                    setPriceChange('');
                    setPercentageChange('0%');
                } else {
                    const avgPrice = parseFloat(data.averagePrice);
                    const quantity = data.quantity;
                    
                    setMaxShares(quantity);

                    axios.get(`${currentPriceUrl}${symbol}/prev`, {
                        params: { adjusted: true, apiKey: 'JUssIWf2KBwBlfELiiQvNwh5YMqj35MI' }
                    })
                    .then((priceResponse) => {
                        const priceData = priceResponse.data;
                        if (priceData.results && priceData.results.length > 0) {
                            const latestPrice = priceData.results[0].c;
                            const change = latestPrice - avgPrice;
                            const percentage = ((change / avgPrice) * 100).toFixed(2);

                            setCurrentPrice(latestPrice);
                            setStockInfo([
                                { label: "Company Name", value: company },
                                { label: "Number of Shares", value: quantity },
                                { label: 'Current Price', value: `$${latestPrice.toFixed(2)}` }
                            ]);

                            setPriceChange(change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2));
                            setPercentageChange(`${percentage}% ${change > 0 ? '↑' : '↓'}`);
                        } else {
                            setCurrentPrice('NA');
                            setStockInfo([
                                { label: "Company Name", value: company },
                                { label: "Number of Shares", value: quantity },
                                { label: 'Current Price', value: `$0` }
                            ]);
                        }
                    })
                    .catch((error) => {
                        console.log('Error fetching current price', error.message);
                        setCurrentPrice('NA');
                    });
                }
            })
            .catch((error) => {
                console.log('Error fetching stock info', error.message);
            });
    }, [symbol, company]);

    const handleSell = () => {
        if (shares) {
            const quantityToSell = parseInt(shares);
            if (quantityToSell > maxShares) {
                alert('You cannot sell more shares than you own.');
                return;
            }

            axios.post(sell_url, null, {
                params: {
                    tickerSymbol: symbol,
                    quantity: quantityToSell,
                    salePricePerShare: currentPrice,
                }
            })
            .then((res) => {
                console.log(res);
                alert(res.data);
            })
            .catch((error) => {
                console.log('Error', error.message);
            });

            handleReset();
        } else {
            alert('Please enter the number of shares to sell');
        }
    };

    const handleReset = () => {
        setShares('');
    };

    const priceChangeColor = parseFloat(priceChange) >= 0 ? 'green' : 'red';
    const placeholderText = maxShares === null ? 'NA' : `0-${maxShares}`;

    return (
        <div className={styles.outerContainer}>
            <form className={styles.buyContainer} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.itemsWrapper}>
                    {stockInfo.map((item, index) => (
                        <div key={index} className={styles.itemInside}>
                            <h3 className={styles.infoLabel}>{item.label}</h3>
                            <p className={styles.infoValue}>
                                {item.label === 'Current Price' ? (
                                    <>
                                        {item.value}
                                        <span
                                            style={{ color: priceChangeColor, marginLeft: '0.5rem' }}
                                        >
                                            {percentageChange}
                                        </span>
                                    </>
                                ) : item.value}
                            </p>
                        </div>
                    ))}
                    <div className={styles.itemInside}>    
                        <h3 className={styles.infoLabel}>Shares</h3>
                        <input 
                            type='number' 
                            required 
                            placeholder={placeholderText} 
                            className={styles.inputNumber} 
                            style={{ maxWidth: '7rem', paddingInline: '0.5rem', paddingBlock: '0.2rem', borderColor: 'black' }}
                            value={shares}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (maxShares === null) {
                                    return;
                                }
                                if (value === '' || parseInt(value) <= maxShares) {
                                    setShares(value);
                                } else {
                                    alert('You cannot enter more shares than you own.');
                                }
                            }}
                            disabled={maxShares === null} 
                        />
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.button} onClick={handleSell} disabled={maxShares === null}>Sell</button>
                    <button type="button" className={styles.button} onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default Sellstock;
