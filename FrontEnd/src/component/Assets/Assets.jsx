import React, { useEffect, useState } from 'react';
import AssetsTable from './AssetsTable.jsx';
import './Assets.css';
import axios from 'axios'
const Assets = () => {
  const [holdings,setHoldings] =useState([])

  useEffect(()=>{
    axios.get(`http://localhost:8080/portfolio/pagedHolding?pageNo=1&pageSize=10`).then((response)=> {
    console.log(response.data)
    setHoldings(response.data)
  })
  },[])
  return (
    <div>
      <AssetsTable holdings ={holdings}/>
    </div>
  )
}

export default Assets