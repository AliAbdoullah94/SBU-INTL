import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../auth/AuthenticationService";
import useFetch from "./useFetch";

import React from "react";

const Login = (props) => {
    const [password, setPassword] = useState("");
    const [mail, setmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [mailError, setmailError] = useState("");


    const { data: users } = useFetch('http://localhost:8000/users');

    const navigate = useNavigate();

    let NAME;

    const handleValidation = (event) => {

        let formIsValid = true;
        console.log("Handling Validation");
        if (!mail.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            console.log("Not Valid Mail");
            formIsValid = false;
            setmailError("mail Not Valid");
            return false;
        } else {
            setmailError("");
            console.log("Valid mail");
            formIsValid = true;
        }

        users.forEach(element => {
            if (element.mail === mail) {
                console.log("Found");
                console.log("Element Pass: ", element.password);
                console.log("Entered Pass: ", password);
                if (element.password === password) {
                    console.log("Password matched");
                    NAME = element.firstName;
                    console.log("Name is", element.firstName);
                    console.log("NAME is", NAME);
                    formIsValid = true;
                    users.length = element.id;
                }
                else {
                    setpasswordError("Wrong Password");
                    formIsValid = false;
                }
            }
            else {
                setmailError("Mail not Found");
                formIsValid = false;
            }
        });
        return formIsValid;
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        let validated = handleValidation()
        console.log(validated);
        if  (validated){
            AuthenticationService.registerSuccesfullLogin(NAME);
            console.log(`Navigating to /welcome/${NAME}`);
            navigate(`/welcome/${NAME}`);
        }           
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form id="loginform" onSubmit={loginSubmit}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="EmailInput"
                                    name="EmailInput"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(event) => setmail(event.target.value)}
                                />
                                <small id="mailHelp" className="text-danger form-text">
                                    {mailError}
                                </small>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <small id="passworderror" className="text-danger form-text">
                                    {passwordError}
                                </small>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
