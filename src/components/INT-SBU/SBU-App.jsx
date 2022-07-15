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
import Apply from './Apply';
import SignUp from './SignUp';
import NotFound from '../INT/NotFound';
import Sformik from './Sformik';
import Myformik from './Apply';

const SBU = () => {

    const [loggedIn, setIsLoggedIn] = useState(false);
    return (
        <div>
            <Router>
                <Header loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Routes>
                    <Route exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="/sign-up" element={<SignUp setIsLoggedIn={setIsLoggedIn}/>} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="/welcome/:name" element={<Welcome/>}/>
                    <Route path="/apply" element={<Apply/>}/>
                    <Route path="/todos" element={<ListTodos/>}/>
                    <Route path="/todos/:id" element={<Todo/>}/>
                    <Route path="/formik" element={<Sformik/>}/>
                    <Route path="/myformik" element={<Myformik/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            {/* <Footer/> */}
        </div>
    );
}

export default SBU;