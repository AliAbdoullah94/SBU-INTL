import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../../auth/AuthenticationService";

const Header = () => {
    const [isUserLoggedIn, setIsUserLoggedin] = useState(false);

    useEffect(() => {
        console.log("from use effect")
        setIsUserLoggedin(AuthenticationService.isUserLoggedIn());
    }, [])

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a href="http://localhost:4200/" className="navbar-brand">INT</a></div>
                <ul className="navbar-nav">
                    {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/Ali">Home</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/apply">Apply</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end" >
                    {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {!isUserLoggedIn && <li><Link className="nav-link" to="/sign-up">SignUp</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;