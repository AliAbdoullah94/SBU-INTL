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
                    {props.loggedIn && <li><Link className="nav-link" to="/course">Add Course</Link></li>}
                    {props.loggedIn && <li><Link className="nav-link" to="/courses">Show Courses</Link></li>}
                    {props.loggedIn && <li><Link className="nav-link" to="/grades">Add Grades</Link></li>}
                    {props.loggedIn && <li><Link className="nav-link" to="/main">Main Form</Link></li>}
                    {props.loggedIn && <li><Link className="nav-link" to="/responses">Responses</Link></li>}
                    {props.loggedIn && <li><Link className="nav-link" to="/applicants">Applicants</Link></li>}
                    {/* {props.loggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>} */}
                    {props.loggedIn && <li><Link className="nav-link" to="/archive">Archive</Link></li>}
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