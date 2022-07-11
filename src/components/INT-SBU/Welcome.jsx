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
                Or Apply <Link to="/apply">here</Link>.
            </div>
            
        </div>
    );
}

export default Welcome;