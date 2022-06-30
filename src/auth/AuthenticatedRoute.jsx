/* import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthenticationService from "../Auth/AuthenticationService";
import Logout from "./Loguot";
import Welcome from "./Welcome";

const AuthenticatedRoute = () => {
    if(AuthenticationService.isLoggedIn) {
        return <Route  {...this.props} />
    }
    else {
        return <Router to="/login" />
    }
}

/* class AuthenticatedRoute extends Component {

    render() {
        if(AuthenticationService.isLoggedIn) {
            return <Route  {...this.props} />
        }
        else {
            return <Router to="/login" />
        }

    }

}
 */
/* export default AuthenticatedRoute; */ */