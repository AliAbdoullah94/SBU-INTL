import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

const Login = () => {

    const [name, setName] = useState('in28minutes');
    const [password, setPassword] = useState('');
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const [loginSuccesfull, setLoginSuccesfull] = useState(false);

    return (
        <div>
            <h1>Login</h1>
            <div className="container">
                {/*<ShowInvalidLogin loginSuccesfull={this.state.loginSuccesfull} hasLoginFailed={this.state.hasLoginFailed}/>*/}
                {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {loginSuccesfull && <div>Succesfull!!</div>}
                User Name: <input type="text" name='username' value={name} onChange={(e) => setName(e.target.value)} />
                Password: <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                <LoginManage username={name} password={password} setLF={setHasLoginFailed} setLS={setLoginSuccesfull} />
            </div>
        </div>
    );
}

const LoginManage = (props) => {

    const navigate = useNavigate();

    function loginClicked() {
        console.log('log in clicked');
        if (props.username === 'in28minutes' && props.password === 'd') {
            AuthenticationService.registerSuccesfullLogin(props.username);
            navigate(`/welcome/${props.username}`);
        }
        else {
            props.setLF(true);
            props.setLoginSuccesfull(false);

        }
    }

    return (
        <>
            <button className="btn btn" onClick={loginClicked}>Login</button>
        </>
    )
}

export default Login;