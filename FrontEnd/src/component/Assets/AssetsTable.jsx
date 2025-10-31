import React, { useEffect, useState } from 'react';
import './Assets.css';
import Assetwidget from './Assetwidget.jsx';

const AssetsTable = ({ holdings }) => {

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const transformedData = holdings.map(holding => ({
      symbol: `NASDAQ:${holding.tickerSymbol}`,  
      quantity: holding.quantity,
     
    }));
    
    setCardData(transformedData);
  }, [holdings]);

  return (
    <section className="assets_container" style={{margin: '0 auto 0'}}>
      <div className='assets_header'>
        <h6 style={{ fontFamily: 'Poppins', fontSize: '1.2em' }}>Assets</h6>
      </div>
      <div className="assets_card__container">
        {cardData.map((card, index) => (
          <div key={index} className="assets_card__article" >
            <Assetwidget symbol={card.symbol} quantity={card.quantity} change={card.change} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AssetsTable;
