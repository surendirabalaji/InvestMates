import React, { useState } from 'react';
import { MdDashboard, MdMenu } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoBagAdd } from "react-icons/io5";
import { FaClipboardList, FaCartArrowDown } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [activeIcon, setActiveIcon] = useState('dashboard');

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleIconClick = (icon) => {
        setActiveIcon(icon);
    };

    return (
        <div className={`${classes.sidebar} ${isCollapsed ? classes.collapsed : ''}`} >
            <div className={classes.sidebarHeader}>
                <div className={classes.logoContainer}>
                    <h5 className={classes.logoText}>InvestMates</h5>
                </div>
                <div onClick={toggleSidebar} className={classes.toggleBtn}>
                    <img src='https://assets.website-files.com/60509a2bb55f3484764c0832/60509d3de156c83421f583d9_hamburger.svg' loading='lazy' className={classes.navicon}></img>
                </div>
            </div>
            <hr className={classes.sidebardivider}/>
            <nav className={classes.sidebarNav}>
                <NavLink to="/Dashboard" className={`${classes.navItem} ${activeIcon === 'dashboard' ? classes.active : ''}`} onClick={() => handleIconClick('dashboard')}>
                    <MdDashboard  className={classes.icons}/>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/Assets" className={`${classes.navItem} ${activeIcon === 'assets' ? classes.active : ''}`} onClick={() => handleIconClick('assets')}>
                    <IoBagAdd  className={classes.icons}/>
                    <span>Assets</span>
                </NavLink>
                <NavLink to="/Watchlist" className={`${classes.navItem} ${activeIcon === 'watchlist' ? classes.active : ''}`} onClick={() => handleIconClick('watchlist')}>
                    <FaClipboardList className={classes.icons} />
                    <span>Watchlist</span>
                </NavLink>
                <NavLink to="/Trade" className={`${classes.navItem} ${activeIcon === 'trade' ? classes.active : ''}`} onClick={() => handleIconClick('trade')}>
                    <FaCartArrowDown className={classes.icons} />
                    <span>Trade</span>
                </NavLink>
                <NavLink to="/Transactions" className={`${classes.navItem} ${activeIcon === 'transactions' ? classes.active : ''}`} onClick={() => handleIconClick('transactions')}>
                    <GrTransaction className={classes.icons} />
                    <span>Transactions</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Navbar;