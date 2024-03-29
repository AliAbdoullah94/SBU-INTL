import { useState } from 'react';
import { BrowserRouter as Router, useNavigate, Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import './todo.css';
import ListTodos from './ListTodos';
import Login from './Login';
import Logout from './Logout';
import Welcome from './Welcome';
import Todo from './Todo';
import { Link } from "react-router-dom";
import AuthenticationService from "../../auth/AuthenticationService";
import Header from './Header';
import Navbar from '../INT/navbar';

const TodoApp = () => {
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
                    <Route path="/todos/:id" element={<Todo/>}/>
                </Routes>
                {/* <Footer/> */}
            </Router>
        </div>
    );
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

export default TodoApp;