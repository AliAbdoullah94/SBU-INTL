import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../../auth/AuthenticationService";

const Header = (props) => {
    const [isUserLoggedIn, setIsUserLoggedin] = useState(false);

    useEffect(() => {
        console.log("from use effect")
        setIsUserLoggedin(AuthenticationService.isUserLoggedIn());
    }, [])

    const handleLogout = () => {
        AuthenticationService.logout();
        props.setIsLoggedIn(false);
    }
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a href="http://localhost:4200/" className="navbar-brand">INT</a></div>
                <ul className="navbar-nav">
                    {props.loggedIn && <li><Link className="nav-link" to="/welcome/Ali">Home</Link></li>}
                    {!props.loggedIn && <li><Link className="nav-link" to="/apply">Apply</Link></li>}
                    {!props.loggedIn && <li><Link className="nav-link" to="/contact">Contact Details</Link></li>}
                    {!props.loggedIn && <li><Link className="nav-link" to="/pass">Passport</Link></li>}
                    {!props.loggedIn && <li><Link className="nav-link" to="/course">Course Selection</Link></li>}
                    {props.loggedIn && <li><Link className="nav-link" to="/forms">Forms</Link></li>}
                    {props.loggedIn && <li><Link className="nav-link" to="/applicants">Applicants</Link></li>}
                    {props.loggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end" >
                    {!props.loggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {!props.loggedIn && <li><Link className="nav-link" to="/sign-up">SignUp</Link></li>}
                    {props.loggedIn && <li><Link className="nav-link" to="/logout" onClick={handleLogout}>Logout</Link></li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;