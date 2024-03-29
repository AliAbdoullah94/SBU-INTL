import { useState } from "react";
import { useParams } from "react-router-dom";

const Welcome = () => {

    const[welcomeMessage, setWelcomeMessage] = useState('');
    const { name } = useParams();

    
    const handleSuccessfullResponse = (response) => {
        setWelcomeMessage(response.data.message);
    }

    const handleError = (error) => {
        setWelcomeMessage(error.response.data.message);
    }

    return (<div>
        <h1>Welcome in INT</h1>
        <div className="container">
            Click here to get customized welcome message
            <button  className="btn btn-success">Get Welcome message</button>
        </div>
        <div className="container">
            {welcomeMessage}
        </div>
    </div>);
}

export default Welcome;