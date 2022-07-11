import Navbar from './navbar';
import Home from './Home';
import Login from './LogIn';
import Logout from './Loguot';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import SignUp from './SignUp';
import Header from './Header';
import Welcome from './Welcome';
import { useState } from 'react';

const INT = () => {

    const [loggedIn, setIsLoggedIn] = useState(false);
    
    return (
        <div>
            <Router>
            <Navbar loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn}/>
                {/* <Header loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/login" element={<Login loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/sign-up" element={<SignUp loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/blogs/:id" element={<BlogDetails />} />
                        <Route path="/logout" element={<Logout loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/welcome/:name" element={<Welcome />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default INT;
