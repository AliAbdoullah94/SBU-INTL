import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicantDataService from "../../api/ApplicantDataService";
import ResponseDataService from "../../api/ResponseDataService";

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

    const replyClicked = (applicantEmail, applicantId) => {
        console.log("Reply Clicked")
        ResponseDataService.retrieveResponse(applicantEmail)
        .then(
            (res) => {
                console.log("Response From Back Is", res)
                if (res.data) {
                    navigator(`/response/${applicantEmail}/${res.data.id}/${applicantId}`)
                }
                else {
                    navigator(`/response/${applicantEmail}/new/${applicantId}`)
                }
            }
        )
    }

    return (
        <div>
            <h1>Applicants</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-12 border border-5 p-3 mb-2 shadow-lg p-3">
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
                                    <th>Date Applied</th>
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
                                                <td>{e.birth ? moment(e.birth).format('YYYY-MM-DD') : "..."}</td>
                                                <td>{e.gender ? e.gender : "..."}</td>
                                                <td>{e.nationality ? e.nationality : "..."}</td>
                                                <td>{e.degree ? e.degree : "..."}</td>
                                                <td>{e.applyFor ? e.applyFor : "..."}</td>
                                                <td>{e.job ? e.job : "..."}</td>
                                                <td>{e.dateApplied ? moment(e.dateApplied).format('YYYY-MM-DD') : "..."}</td>
                                                <td>{e.aboutApplicant ? e.aboutApplicant : "..."}</td>
                                                <td><button className="btn btn-warning" onClick={() => deleteApplicantClicked(e.id)}>Delete</button></td>
                                                <td><button className="btn btn-success" onClick={() => ShowApplicantClicked(e.id)}>Show Applicant Info</button></td>
                                                <td><button className="btn btn-success" onClick={() => replyClicked(e.email, e.id)}>{!e.response ? "Reply" : "Edit Reply"}</button></td>
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

export default Applicants;

