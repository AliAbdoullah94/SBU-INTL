import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicantDataService from "../../api/ApplicantDataService";

const Applicants = () => {

    const [applicants, setApplicants] = useState([]);
    const [message, setMessage] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        ApplicantDataService.retrieveAllApplicants()
            .then(
                response => {
                    setApplicants(response.data)
                }
            )
    }, [applicants, message])

    const deleteApplicantClicked = (id) => {
        /* let username = AuthenticationService.getLoggedInUserName(); */
        ApplicantDataService.deleteApplicant(id)
            .then(
                response => {
                    setMessage(`Delete of applicant ${id} succesfull`)
                }
            )
    }

    const ShowApplicantClicked = (id) => {
        navigator(`/applicants/${id}`)
    }

    return (
        <div>
            <h1>Applicants</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Birth</th>
                            <th>Gender</th>
                            <th>Nationality</th>
                            <th>Degree</th>
                            <th>Apply For</th>
                            <th>Job</th>
                            <th>About Applicant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applicants.map(
                                e => (
                                    <tr key={e.id}>
                                        <td>{e.firstName}</td>
                                        <td>{e.lastName}</td>
                                        <td>{e.email}</td>
                                        <td>{moment(e.birth).format('YYYY-MM-DD')}</td>
                                        <td>{e.gender}</td>
                                        <td>{e.nationality}</td>
                                        <td>{e.degree}</td>
                                        <td>{e.applyFor}</td>
                                        <td>{e.job}</td>
                                        <td>{e.aboutApplicant}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteApplicantClicked(e.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => ShowApplicantClicked(e.id)}>Show Applicant Info</button></td>
                                    </tr>


                                )
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Applicants;

