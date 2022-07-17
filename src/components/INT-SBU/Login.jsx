import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../auth/AuthenticationService";
import useFetch from "./useFetch";
import { useEffect } from "react";
import fpass from "../resources/Forgot.gif"

import React from "react";
import UserDataService from "../../api/UserDataService";

const Login = (props) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [forgot, setForgot] = useState(false);

    /* const { data: users } = useFetch('http://localhost:8080/users'); */
    const { data: users } = useFetch('http://localhost:8080/users');

    let NAME;

    const navigate = useNavigate();


    const handleValidation = (event) => {

        console.log("users",users);
        let formIsValid = true;
        console.log("Handling Validation");
        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            console.log("Not Valid email");
            formIsValid = false;
            setEmailError("email Not Valid");
            return false;
        } else {
            setEmailError("");
            console.log("Valid email");
            formIsValid = true;
        }
        if (users.length > 0) {
            users.forEach(element => {
                if (element.email === email) {
                    console.log("Found");
                    console.log("Element Pass: ", element.password);
                    console.log("Entered Pass: ", password);
                    if (element.password === password) {
                        console.log("Password matched");
                        if (element.firstName) {
                            NAME = element.firstName;
                        }
                        else {
                            NAME = element.email;
                        }
                        console.log("Name is", element.firstName);
                        console.log("NAME is", NAME);
                        console.log("form is", formIsValid);
                        formIsValid = true;
                        console.log("form is", formIsValid);
                        users.length = 0;
                    }
                    else {
                        setpasswordError("Wrong Password");
                        formIsValid = false;
                    }
                }
                else {
                    setEmailError("Email not Found");
                    formIsValid = false;
                }
            });
        } else {
            setEmailError("Empty DB");
            formIsValid = false;
        }


        return formIsValid;
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        let validated = handleValidation()
        console.log(validated);
        if (validated) {
            props.setIsLoggedIn(true);
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
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <small id="emailHelp" className="text-danger form-text">
                                    {emailError}
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
                                <small id="forgoterror" className="form-text">
                                    <label style={{ cursor: "pointer" }} onClick={() => setForgot(true)}>forgot password?</label>
                                    {forgot && <p>Did Will Smith use one of those flashy thingies from Men in Black on you?</p>}
                                    {forgot && <img src={fpass} alt="loading..." />}
                                    {forgot && <p>Unfortunetly we can't reset password for you.. So try to remember it!</p>}
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
