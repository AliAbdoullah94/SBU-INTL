import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseDataService from "../../api/CourseDataService";
import ResponseDataService from "../../api/ResponseDataService";

const Courses = () => {

    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        CourseDataService.retrieveAllCourses()
            .then(
                response => {
                    setCourses(response.data)
                }
            )
    }, [courses, message])

    const deleteCourseClicked = (id) => {
        /* let username = AuthenticationService.getLoggedInUserName(); */
        CourseDataService.deleteCourse(id)
            .then(
                response => {
                    setMessage(`Delete of course ${id} succesfull`)
                }
            )
    }


    return (
        <div>
            <h1>Courses</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-5 border border-5 p-3 mb-2 shadow-lg p-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Description</th>
                                    <th>Units</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    courses.map(
                                        e => (
                                            <tr key={e.id}>
                                                <td>{e.courseName}</td>
                                                <td>{e.description}</td>
                                                <td>{e.units}</td>
                                                <td><button className="btn btn-warning" onClick={() => deleteCourseClicked(e.id)}>Delete</button></td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;

