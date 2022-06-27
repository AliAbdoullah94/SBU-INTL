import { Link, useParams } from "react-router-dom";
import HelloWorldService from "../../api/HelloWorldService";

const Welcome = () => {

    const { name } = useParams();

    const retrieveWelcomeMessage = () => {
        HelloWorldService.executeHelloWorldService()
        .then(response => console.log(response))
        //.catch()
    }
    return (
        <div>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome {name}. You can manage your todos <Link to="/todos">here</Link>.
            </div>
            <div className="container">
            Click here to get customized welcome message
            <button onClick={retrieveWelcomeMessage} className="btn btn-success">Get Welcome message</button>
        </div>
        </div>
    );
}

export default Welcome;