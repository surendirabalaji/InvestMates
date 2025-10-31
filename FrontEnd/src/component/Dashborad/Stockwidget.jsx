import React, { useState, useEffect, useRef, memo } from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";
import './Stockwidget.css'

function Stockwidget({heightvalue ='300', symbol}) {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const uniqueId = `tradingview-widget-${Math.random().toString(36).substr(2, 9)}`;
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.id = uniqueId;

    // Use the provided symbol if available, otherwise default to 'NASDAQ:AMZN'
    const widgetSymbol = symbol ? `NASDAQ:${symbol}` : 'NASDAQ:AMZN';

    script.innerHTML = JSON.stringify({
      width: '100%',
      height: heightvalue,
      symbol: widgetSymbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });

    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        const widgetContainer = containerRef.current.querySelector('.tradingview-widget-container__widget');
        if (widgetContainer) {
          widgetContainer.innerHTML = '';
          widgetContainer.appendChild(script);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (containerRef.current) {
        const existingScript = document.getElementById(uniqueId);
        if (existingScript) {
          existingScript.remove();
        }
      }
    };
  }, [isLoaded, symbol, heightvalue]);  

  if (!isLoaded) return null;

  return (
    <div className='stocklist-container'>
      <div className='stocklist-header'>
        <h6 style={{fontFamily: 'Poppins',fontSize:'1.2em'}}>Performance</h6>
        <span style={{fontFamily: 'Poppins', fontWeight: "500",color:'#5c31ff',letterSpacing:'0.07em',fontSize:'0.8em'}}></span>
      </div>
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}

export default memo(Stockwidget);