import React, { useState } from 'react'
import Buystock from './Buystock';
import Sellstock from './Sellstock';

const Tradeaction = ({symbol,company}) => {
  console.log(symbol)
  const [brender, setbrender] = useState(true);

  function changetoBuy() {
    setbrender(true);
  }

  function changetoSell() {
    setbrender(false)
  }

  return (
    <section className='action-container'> 
      <h6 className='action-title' style={{paddingBlock:'1.5rem', fontFamily:'Poppins',fontSize:'1.2rem'}}>Trade Action</h6>
      <div style={{backgroundColor:'#eeedf2'}}>
        <nav className="navbar navbar-expand-lg navbar-light" style={{cursor:'pointer', paddingInline:'1rem'}}>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item" style={{marginRight: '1rem'}}>
                  <span 
                    className={`nav-link ${brender ? 'active fw-bold' : ''}`} 
                    aria-current={brender ? "page" : undefined} 
                    onClick={changetoBuy}
                  >
                    Buy
                  </span>
                </li>
                <li className="nav-item">
                  <span 
                    className={`nav-link ${!brender ? 'active fw-bold' : ''}`}
                    aria-current={!brender ? "page" : undefined}
                    onClick={changetoSell}
                  >
                    Sell
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {brender ? <Buystock symbol={symbol} company={company}/> : <Sellstock symbol={symbol} company={company}/>}
      </div>
    </section>
  )
}

export default Tradeaction