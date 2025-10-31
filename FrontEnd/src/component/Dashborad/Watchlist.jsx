import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";
import './Watchlist.css';
import { NavLink } from 'react-router-dom';

const Watchlist = ({ watchlist }) => {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const uniqueId = `tradingview-widget-${Math.random().toString(36).substr(2, 9)}`;
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.id = uniqueId;

  
    const forexSymbols = [
      { s: "FX:EURUSD", d: "EUR to USD" },
      { s: "FX:GBPUSD", d: "GBP to USD" },
      { s: "FX:USDJPY", d: "USD to JPY" },
      { s: "FX:USDCHF", d: "USD to CHF" },
      { s: "FX:AUDUSD", d: "AUD to USD" },
      { s: "FX:USDCAD", d: "USD to CAD" }
    ];

    const watchlistSymbols = watchlist.map(item => ({
      s: `NASDAQ:${item.tickerSymbol}`, // Assuming NASDAQ for simplicity; adjust as needed
      d: item.tickerSymbol
    }));

    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: false,
      locale: "en",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: "300",
      height: "300",
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(42, 46, 57, 0)",
      scaleFontColor: "rgba(209, 212, 220, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      tabs: [
        {
          title: "Stocks",
          symbols: watchlistSymbols,
          originalTitle: "Watchlist"
        },
        {
          title: "Indices",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500 Index" }
          ],
          originalTitle: "Indices"
        },
        {
          title: "Forex",
          symbols: forexSymbols,
          originalTitle: "Forex"
        },

      ]
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
  }, [isLoaded, watchlist]);

  if (!isLoaded) return null;

  return (
    <div className='watchlist-container'>
      <div className='watchlist-header'>
        <h4 style={{ fontFamily: 'Poppins', fontSize: '1rem' }}>Watchlist</h4>
        <NavLink to='/Watchlist' style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Poppins', fontWeight: "500", color: '#5c31ff', letterSpacing: '0.07em', fontSize: '0.8em' }}>
            more<IoIosArrowRoundForward size={36} />
          </span>
        </NavLink>
      </div>
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default Watchlist;
