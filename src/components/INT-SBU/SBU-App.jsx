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
import Forms from './Forms';
import Applicant from './Applicant';
import Applicants from './Applicants';
import Form from './MultiStepForm/Form';
import ContactDetails from './formsComponents/ContactDetails';
import PassAndVisa from './formsComponents/PassAndVisa';
import CourseSelection from './formsComponents/CourseSelection';
import Archive from './Archive';

const SBU = () => {

    const [loggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    return (
        <div>
            <Router>
                <Header loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Routes>
                    <Route exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>}/>
                    <Route path="/sign-up" element={<SignUp setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setEmail={setEmail}/>}/>
                    <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="/welcome/:name" element={<Welcome/>}/>
                    <Route path="/apply" element={<Apply email={email}/>}/>
                    <Route path="/todos" element={<ListTodos/>}/>
                    <Route path="/todos/:id" element={<Todo/>}/>
                    <Route path="/formik" element={<Sformik/>}/>
                    <Route path="/forms" element={<Forms/>}/>
                    <Route path="/archive" element={<Archive/>}/>
                    <Route path="/applicants" element={<Applicants/>}/>
                    <Route path="/multi" element={<Form/>}/>
                    <Route path="/contact" element={<ContactDetails/>}/>
                    <Route path="/pass" element={<PassAndVisa/>}/>
                    <Route path="/course" element={<CourseSelection/>}/>
                    <Route path="/applicants/:id" element={<Applicant/>}/>
                    <Route path="*" element={<NotFound />} />
                    
                </Routes>
            </Router>
            {/* <Footer/> */}
        </div>
    );
}

export default SBU;