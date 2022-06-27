import { useState } from "react"
import useFetch from './useFetch'
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const [mail, setMail] = useState('ali@mail.com');
    const [password, setPassword] = useState('1234');
    const {data: users} = useFetch('http://localhost:8000/users');
    
    return (
        <div className="login">
            <label>Mail:</label>
            <input type="email" name='mail' onChange={(e) => setMail(e.target.value)} required value={mail} />
            <label>Set a password:</label>
            <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} required value={password} />
            <LoginManage  users={users} mail={mail} password ={password} setIsLoggedIn={props.setIsLoggedIn}/>
        </div>
    );

}

const LoginManage = (props) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('handle login from login manage');
        console.log(props.users);
        props.users.forEach(element => {
            if (element.mail === props.mail){
                if(element.password === props.password){
                    props.setIsLoggedIn(true);
                    navigate(`/welcome/${element.firstName}`);
                }
                else {
                    console.log('wrong password');
                }
            }
            else{
                console.log('Mail not Found');
            }
        });
    }

    return(<button onClick={handleLogin}>Login</button>);

}

export default Login;