import { Link, useParams } from "react-router-dom";

const Welcome = () => {

    const { name } = useParams();

    return (
        <div>
            <h1>Welcome!</h1>
            <div className="d-flex flex-row">
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-6 border border-5 p-3 mb-2 shadow-lg p-3">
                            <h2><Link to="/course">Add Course</Link></h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-6 border border-5 p-3 mb-2 shadow-lg p-3">
                            <h2><Link to="/grades">Add Grades</Link></h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-3 border border-5 p-3 mb-2 shadow-lg p-3">
                            <h2><Link to="/apply">Apply</Link></h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;