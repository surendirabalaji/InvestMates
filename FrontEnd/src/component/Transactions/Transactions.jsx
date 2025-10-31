import React, { useState, useEffect } from 'react';
import TransactionsTable from './TransactionsTable'; 
import { IoIosArrowRoundForward } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './Transactions.css'; 
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

function Transactions({ maxHeight = '100vh' }) {  
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [transactionData, setTransactionData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/portfolio/pagedTransaction?pageNo=1&pageSize=${entriesToShow}`);
        console.log(response.data);
        setTransactionData(response.data);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchData();
  }, [entriesToShow]); 

  const handleEntriesChange = (newEntries) => {
    setEntriesToShow(newEntries);
  };

  return (
    <div className="transactions-container">
      <div className='navbar'>
        <div className='transactions-header' style={{ paddingTop: '2rem' }}>
          <h6 style={{ fontFamily: 'Poppins', fontSize: '1.2em' }}>Transactions</h6>
          <NavLink to='/Transactions' style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Poppins', fontWeight: "500", color: '#5c31ff', letterSpacing: '0.07em', fontSize: '0.8em' }}>
              more <IoIosArrowRoundForward size={36} />
            </span>
          </NavLink>
        </div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: '#eeedf2', borderRadius: '0.5rem' }}>
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Dropdown>
                <span style={{paddingInline:'1.5rem',fontFamily:"Poppins",fontSize:'1rem'}}> Show</span>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {entriesToShow}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleEntriesChange(5)}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => handleEntriesChange(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => handleEntriesChange(20)}>20</Dropdown.Item>
                <Dropdown.Item onClick={() => handleEntriesChange(30)}>30</Dropdown.Item>
                <Dropdown.Item onClick={() => handleEntriesChange(50)}>50</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="button" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
      <TransactionsTable transactions={transactionData.slice(0, entriesToShow)} maxHeight={maxHeight} />
    </div>
  );
}

export default Transactions;
