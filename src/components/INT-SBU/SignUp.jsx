import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../auth/AuthenticationService";

const SignUp = () => {
    const [isPending, setIsPending] = useState(false);

    const [firstName, setFirstName] = useState('Ali');
    const [lastName, setLastName] = useState('Abdoullah');
    const [mail, setMail] = useState('ali@mail.com');
    const [password, setPassword] = useState('1234');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { firstName, lastName, mail, password };
        fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(() => {
                setIsPending(false);
                AuthenticationService.registerSuccesfullLogin(firstName)
                navigate(`/welcome/${firstName}`)
            })

    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required value={firstName}
                />
            </div>
            <div className="mb-3">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setMail(e.target.value)} required value={mail}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)} required value={password}
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
            </p>
        </form>
    );
}

export default SignUp;