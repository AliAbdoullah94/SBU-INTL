import { Link, useParams } from "react-router-dom";


const Welcome = () => {

    const { name } = useParams();

    return (
        <div>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome {name}. You can manage your todos <Link to="/todos">here</Link>.
            </div>
            <div className="container">
            Click here to get customized welcome message
            <button  className="btn btn-success">Get Welcome message</button>
        </div>
        </div>
    );
}

export default Welcome;