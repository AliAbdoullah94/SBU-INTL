import { useState } from 'react';
import { BrowserRouter as Router, useHistory, Route, Switch } from 'react-router-dom';

const Todo = () => {
    return (
        <div >
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/welcome">
                        <Welcome/>
                    </Route>
                </Switch>
            </Router>
            {/*<Login/>
            <Welcome/>*/}
        </div>
    );
}


const Welcome = () => {
    return (<div>Welcome</div>);
}

const Login = () => {

    const [name, setName] = useState('in28minutes');
    const [password, setPassword] = useState('');
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    const [loginSuccesfull, setLoginSuccesfull] = useState(false);

    const handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    return (
        <div>
            {/*<ShowInvalidLogin loginSuccesfull={this.state.loginSuccesfull} hasLoginFailed={this.state.hasLoginFailed}/>*/}
            {loginSuccesfull && <div>Succesfull!!</div>}
            {hasLoginFailed && <div>Failed</div>}
            User Name: <input type="text" name='username' value={name} onChange={(e) => setName(e.target.value)} />
            Password: <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} />
            <LoginManage username={name} password={password} setLF={setHasLoginFailed} setLS={setLoginSuccesfull}/>
        </div>
    );
}

const LoginManage = (props) => {

    const history = useHistory();

    function loginClicked() {
        console.log('log in clicked');
        if (props.username === 'in28minutes' && props.password === 'd') {
            history.push("/welcome");
        }
        else {
            props.setLF(true);
            props.setLoginSuccesfull(false);
        
        }
    }

    return (
        <>
            <button onClick={loginClicked}>Login</button>
        </>
    )
}

function ShowInvalidLogin(props) {
    if (props.loginSuccesfull == true) {
        return (<div>
            Succesfull
        </div>)
    }
    else if (props.hasLoginFailed == true) {
        return (
            <div>
                Failed!
            </div>
        )
    }

    return null;
}

export default Todo;