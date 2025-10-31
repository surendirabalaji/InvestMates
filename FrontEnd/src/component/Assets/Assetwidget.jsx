import React, { useState, useEffect, useRef } from 'react';

const Assetwidget = ({ symbol, quantity, change}) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const uniqueId = `tradingview-widget-${Math.random().toString(36).substr(2, 9)}`;
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.async = true;
    script.id = uniqueId;
    script.innerHTML = JSON.stringify({
      symbol: symbol || 'NASDAQ:NVDA',
      width: '100%',
      isTransparent: true,
      colorTheme: 'light',
      locale: 'en'
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        const existingScript = document.getElementById(uniqueId);
        if (existingScript) {
          containerRef.current.removeChild(existingScript);
        }
      }
    };
  }, [isLoaded, symbol]);

  if (!isLoaded) return null;

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
      <div className='quantity'><span>Quantity: <span className='quantity-value'>{quantity}</span></span></div>
      <div className='quantity'><span>P&L: <span className='quantity-value'>{change}</span></span></div>
    </div>
  );
};

export default Assetwidget;