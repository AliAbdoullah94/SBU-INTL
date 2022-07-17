import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicantDataService from "../../api/ApplicantDataService";
import AuthenticationService from "../../auth/AuthenticationService";
import useFetch from "./useFetch";

const SignUp = (props) => {
    const [isPending, setIsPending] = useState(false);

    const [firstName, setFirstName] = useState('Ali');
    const [lastName, setLastName] = useState('Abdoullah');
    const [email, setEmail] = useState('ali@mail.com');
    const [password, setPassword] = useState('1234');
    const [password2, setPassword2] = useState('1234');

    const [emailError, setEmailError] = useState("");
    const [emailExistError, setEmailExistError] = useState("");
    const [Password2Erro, setPassword2Error] = useState("");
    const navigate = useNavigate();

    const { data: applicants } = useFetch('http://localhost:8080/applicants');

    const handleValidation = (event) => {

        let formIsValid = true;
        console.log("Handling Validation");
        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            console.log("Not Valid Email");
            formIsValid = false;
            setEmailError("email Not Valid");
            return false;
        } else {
            setEmailError("");
            console.log("Valid email");
            formIsValid = true;
        }

        if (password !== password2) {
            setPassword2Error("Entered Passwords don't match!");
            formIsValid = false;
        }

        applicants.forEach(element => {
            console.log(element);
            if (element.email === email) {
                setEmailExistError(`Email ${email} already exist`);
                formIsValid = false;
            }
        });

        return formIsValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let res = handleValidation();
        console.log(res);
        if (res) {
            e.preventDefault();
            props.setIsLoggedIn(true);
            const applicant = { /* firstName, lastName, */ email, password };
            ApplicantDataService.createApplicant(applicant)
                /* fetch('http://localhost:8080/applicants', {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(applicant)
                }) */
                .then(() => {
                    setIsPending(false);
                    AuthenticationService.registerSuccesfullLogin(email)
                    navigate(`/welcome/${email}`)
                })
        }

    }

    return (
        <form onSubmit={handleSubmit} >
            <div className="row d-flex justify-content-center">
                <h3>Sign Up</h3>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)} required value={email}
                        />
                    </div>
                    <small id="emailHelp" className="text-danger form-text">
                        {emailError}
                    </small>
                    <small id="emailExist" className="text-danger form-text">
                        {emailExistError}
                        {emailExistError && <p className="forgot-password text-mid">
                            <a href="/Login">Login?</a>
                        </p>}
                    </small>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)} required value={password}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            onChange={(e) => setPassword2(e.target.value)} required value={password2}
                        />
                    </div>
                    <small id="passwordHelp" className="text-danger form-text">
                        {Password2Erro}
                    </small>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Already registered <a href="/Login">Login?</a>
                    </p>
                </div>
            </div>
        </form>
    );
}

export default SignUp;