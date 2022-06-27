import { useState } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {

    const handleLogOut = () => {
        console.log("Handle Logout Clicked");
        props.setIsLoggedIn(false);
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a className="navbar-brand">INT</a></div>
                <ul className="navbar-nav">
                    <li><Link className="nav-link" to="/">Home</Link></li>
                    <li><Link className="nav-link" to="/create">New Blog</Link></li>
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end" >
                    {!props.loggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {props.loggedIn && <li onClick={handleLogOut}><Link className="nav-link" to="/logout">Logout</Link></li>}
                    {!props.loggedIn && <li><Link className="nav-link" to="/sign-up">Sign Up</Link></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;