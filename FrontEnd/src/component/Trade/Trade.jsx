import React ,{useState} from 'react'
import Stockwidget from '../Dashborad/Stockwidget'
import './Trade.css'
import Stocksearch from './Stocksearch'

import Tradeaction from './Tradeaction'

const Trade = ({heightValue}) => {
  const [symbol, setSymbol] = useState('');
  const [company, setCompany] = useState('');

  const handleSymbolChange = (newSymbol) => {
    setSymbol(newSymbol);
    console.log(newSymbol)
  };
  const handleCompanyChange = (newCompany) =>{
    setCompany(newCompany)
  }

  return (
    <div className='Trade-container'>
      {/* <h4 style={{padding:'2rem',fontSize:'1.4rem'}}>Trade</h4> */}
      <div className='Trade-Company' style={{minWidth:'100%'}}>
          <Stocksearch onSymbolChange={handleSymbolChange} onCompanyChange={handleCompanyChange}/>
          <div className='Trade-wid'>
          <div>
          <Stockwidget heightvalue='250'symbol={symbol}/>
          <Tradeaction symbol={symbol} company={company}/>
          </div>

          </div>
      </div>
    </div>

    
  )
}

export default Trade
