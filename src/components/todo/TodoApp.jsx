import { useState } from 'react';
import { BrowserRouter as Router, useNavigate, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import './todo.css';
import ListTodos from './ListTodos';
import Login from './Login';
import Logout from './Logout';
import Welcome from './Welcome';

import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

const Todo = () => {
    return (
        <div >
            <Router>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<Login />}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/welcome/:name" element={<Welcome/>}/>
                    <Route path="/todos" element={<ListTodos/>}/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
}

const Header = () => {
    /* const [isUserLoggedIn, setIsUserLoggedIn] = useState(); */
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    /* setIsUserLoggedIn(AuthenticationService.isUserLoggedIn()); */



    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a href="http://www.in28minutes.com"className="navbar-brand">in28Minutes</a></div>
                <ul className="navbar-nav">
                    {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end" >
                    {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                </ul>
            </nav>
        </header>
    )
}

function ShowInvalidLogin(props) {
    if (props.loginSuccesfull === true) {
        return (<div>
            Succesfull
        </div>)
    }
    else if (props.hasLoginFailed === true) {
        return (
            <div>
                Failed!
            </div>
        )
    }

    return null;
}

export default Todo;