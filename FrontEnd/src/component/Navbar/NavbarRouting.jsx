import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashborad/Dashboard';
import Transactions from '../Transactions/Transactions';
import Watchlist from '../Watchlist/Watchlist';
import Navbar from './Navbar';
import Assets from '../Assets/Assets';
import Trade from '../Trade/Trade';
import classes from './Navbar.module.css';

const NavbarRouting = () => {
  return (
    <div className={classes.RoutingContainer}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Transactions' element={<Transactions maxHeight='100vh' />} />
        <Route path='/Watchlist' element={<Watchlist />} />
        <Route path='/Assets' element={<Assets />} />
        <Route path='/Trade' element={<Trade heightValue='100vh'/>} />
        <Route path='*' element={<p>Page Not Found</p>} />
      </Routes>
    </div>
  );
};

export default NavbarRouting;
