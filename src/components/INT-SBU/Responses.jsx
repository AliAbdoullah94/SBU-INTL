import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResponseDataService from "../../api/ResponseDataService";
import AuthenticationService from "../../auth/AuthenticationService";

const Responses = () => {

    const [Responses, setResponses] = useState([]);
    const [message, setMessage] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        ResponseDataService.retrieveAllResponses()
            .then(
                response => {
                    setResponses(response.data)
                }
            )
    }, [Responses, message])

    const deleteResponseClicked = (id) => {
        /* let username = AuthenticationService.getLoggedInUserName(); */
        ResponseDataService.deleteResponse(id)
            .then(
                response => {
                    setMessage(`Delete of Response ${id} succesfull`)
                }
            )
    }

    const ShowApplicantClicked = (id) => {
        navigator(`/applicants/${id}`)
    }

    const editResponseClicked = (applicantEmail, responseId, applicantId) => {
        navigator(`/response/${applicantEmail}/${responseId}/${applicantId}`)
    }

    return (


        <div>
            <h1>Responses</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-12 border border-5 p-3 mb-2 shadow-lg p-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Applicant</th>
                                    <th>Accepted?</th>
                                    <th>Response Text</th>
                                    <th>Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Responses.map(
                                        e => (
                                            <tr key={e.id}>
                                                <td>{e.applicant.firstName + ' ' + e.applicant.lastName}</td>
                                                <td>{e.accepted == false ? "Not" : "Yes"}</td>
                                                <td>{e.responseText}</td>
                                                <td>{moment(e.dateCreated).format('YYYY-MM-DD')}</td>
                                                <td><button className="btn btn-warning" onClick={() => deleteResponseClicked(e.id)}>Delete</button></td>
                                                <td><button className="btn btn-success" onClick={() => ShowApplicantClicked(e.applicant.id)}>Show Applicant Info</button></td>
                                                <td><button className="btn btn-success" onClick={() => editResponseClicked(e.applicant.email, e.id, e.applicant.id)}>Edit Response</button></td>
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

export default Responses;

