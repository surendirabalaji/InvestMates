import React, { useState, useEffect } from 'react';
import { MdDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoBagAdd } from "react-icons/io5";
import { FaClipboardList, FaCartArrowDown } from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';
import classes from './Navbar.module.css';
import { PiDogBold } from "react-icons/pi";

const Navbar = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        const path = location.pathname;
        switch (path) {
            case '/Dashboard':
                setActiveIcon('dashboard');
                break;
            case '/Assets':
                setActiveIcon('assets');
                break;
            case '/Watchlist':
                setActiveIcon('watchlist');
                break;
            case '/Trade':
                setActiveIcon('trade');
                break;
            case '/Transactions':
                setActiveIcon('transactions');
                break;
            default:
                setActiveIcon('');
                break;
        }
    }, [location]);

    const [activeIcon, setActiveIcon] = useState('');

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
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
                <NavLink to="/Dashboard" className={`${classes.navItem} ${activeIcon === 'dashboard' ? classes.active : ''}`}>
                    <MdDashboard className={classes.icons}/>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/Assets" className={`${classes.navItem} ${activeIcon === 'assets' ? classes.active : ''}`}>
                    <IoBagAdd className={classes.icons}/>
                    <span>Assets</span>
                </NavLink>
                <NavLink to="/Watchlist" className={`${classes.navItem} ${activeIcon === 'watchlist' ? classes.active : ''}`}>
                    <FaClipboardList className={classes.icons} />
                    <span>Watchlist</span>
                </NavLink>
                <NavLink to="/Trade" className={`${classes.navItem} ${activeIcon === 'trade' ? classes.active : ''}`}>
                    <FaCartArrowDown className={classes.icons} />
                    <span>Trade</span>
                </NavLink>
                <NavLink to="/Transactions" className={`${classes.navItem} ${activeIcon === 'transactions' ? classes.active : ''}`}>
                    <GrTransaction className={classes.icons} />
                    <span>Transactions</span>
                </NavLink>
            </nav>
            <hr className={classes.sidebardivider2}/>
            <div className={classes.sidebarfooter}>
                <div className={classes.navItem} style={{'pointerEvents': 'none'}} >
                    <PiDogBold className={classes.footericons} style={{color:'#eeedf2'}} />
                    <span style={{fontSize:'0.8em'}}>Team Murphy</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
