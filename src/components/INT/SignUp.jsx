import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [isPending, setIsPending] = useState(false);

    const [firstName, setFirstName] = useState('Ali');
    const [lastName, setLastName] = useState('Abdoullah');
    const [mail, setMail] = useState('ali@mail.com');
    const [password, setPassword] = useState('1234');

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {firstName, lastName, mail, password};
        fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(user)
        })
        .then(() => {
            setIsPending(false);
            navigate.push('/')
        })

    }

    return(
        <div className="sign-up">
            <h2 style={{padding: 10}}>Enter your credential please</h2>
            <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input type="text" name='firstname' onChange={(e) => setFirstName(e.target.value)} required value={firstName}/>
            <label>Last Name:</label>
            <input type="text" name='lastname' onChange={(e) => setLastName(e.target.value)} required value={lastName}/>
            <label>Mail:</label>
            <input type="email" name='mail' onChange={(e) => setMail(e.target.value)} required value={mail}/>
            <label>Set a password:</label>
            <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} required value={password}/>
            {!isPending && <button>Create User</button>}
            {isPending && <button disabled>Creating User..</button>}
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{mail}</p>
            <p>{password}</p>
            </form>
        </div>
    );
}

export default SignUp;