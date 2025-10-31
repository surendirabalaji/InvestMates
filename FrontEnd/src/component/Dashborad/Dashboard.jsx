import React, { useState,useEffect } from 'react'
import Assetslider from './Assetslider'
import Stockwidget from './Stockwidget'
import Watchlist from './Watchlist'
import axios from 'axios'
import './Dashboard.css'
import Transactions from '../Transactions/Transactions'

const Dashboard = () => {
  const [watchlistData,setWatchlistData] =useState([])
  const [holdings,setHoldings] =useState([])
 
  
  useEffect(()=>{
    axios.get(`http://localhost:8080/portfolio/pagedWatchlist?pageNo=1&pageSize=5`).then((response)=> {
    console.log(response.data)
    setWatchlistData(response.data) 
  });
    
    axios.get(`http://localhost:8080/portfolio/pagedHolding?pageNo=1&pageSize=10`).then((response)=> {
    console.log(response.data)
    setHoldings(response.data)
  });


  },[])

  const dummyTransactions = [
    {
      id: 1,
      symbol: "AAPL",
      description: "Apple Inc.",
      date: "2024-08-09",
      current_price: "175.00",
      quantity: 10,
      total_value: "1750.00",
      status: "Completed",
      trade_action: "Buy"
    },
    {
      id: 2,
      symbol: "GOOGL",
      description: "Alphabet Inc.",
      date: "2024-08-08",
      current_price: "122.00",
      quantity: 5,
      total_value: "610.00",
      status: "Completed",
      trade_action: "Sell"
    },
    {
      id: 3,
      symbol: "MSFT",
      description: "Microsoft Corporation",
      date: "2024-08-07",
      current_price: "300.00",
      quantity: 3,
      total_value: "900.00",
      status: "Pending",
      trade_action: "Buy"
    },
    {
      id: 4,
      symbol: "MSFT",
      description: "Microsoft Corporation",
      date: "2024-08-07",
      current_price: "300.00",
      quantity: 3,
      total_value: "900.00",
      status: "Pending",
      trade_action: "Buy"
    },
    {
      id: 5,
      symbol: "MSFT",
      description: "Microsoft Corporation",
      date: "2024-08-07",
      current_price: "300.00",
      quantity: 3,
      total_value: "900.00",
      status: "Pending",
      trade_action: "Buy"
    },

  ];

  return (
    <div className='container'>
      <Assetslider holdings ={holdings}/>
      <div className='class-container'>
        <Stockwidget/>
        <Watchlist watchlist={watchlistData}/>
      </div>
      <div className='transaction-dashboard-container'>
        <Transactions maxHeight='18rem' />
      </div>
    </div>
  )
}

export default Dashboard