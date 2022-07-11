import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import AuthenticationService from '../../auth/AuthenticationService';

const Navbar = (props) => {
    
    const handleLogOut = () => {
        console.log("Handle Logout Clicked");
        props.setIsLoggedIn(false);
    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <h1><a className="navbar-brand">INT</a></h1>
                <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/">Home</Link></li>
                    <li><Link className="nav-link" to="/create">New Blog</Link></li>
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end" >
                    {!props.loggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {props.loggedIn && <li onClick={handleLogOut}><Link className="nav-link" to="/logout">Logout</Link></li>}
                    {!props.loggedIn && <li><Link className="nav-link-sign-up" to="/sign-up">Sign Up</Link></li>}
                </ul>
        </nav>
    );
}

export default Navbar;


{/* <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
                <Link to="/login">Login</Link>
                <Link to="/sign-up" style={{
                    color: 'white',
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Sign Up</Link> */}