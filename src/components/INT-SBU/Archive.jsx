import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogDataService from "../../api/LogDataService";
import AuthenticationService from "../../auth/AuthenticationService";

const Archive = () => {

    const [row, setRow] = useState(1);
    const [logs, setLogs] = useState([]);
    const [message, setMessage] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        LogDataService.retrieveAllLogs()
            .then(
                response => {
                    setLogs(response.data)
                }
            )
    }, [logs, message])

    const deleteLogClicked = (id) => {
        /* let username = AuthenticationService.getLoggedInUserName(); */
        LogDataService.deleteLog(id)
            .then(
                response => {
                    setMessage(`Delete of log ${id} succesfull`)
                }
            )
    }

    const ShowApplicantClicked = (id) => {
        navigator(`/applicants/${id}`)
    }

    const ShowFormClicked = (id) => {
        navigator(`/forms`)
    }

    return (
        <div>
            <h1>Archive</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-6 border border-5 p-3 mb-2 shadow-lg p-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Row</th>
                                    <th>Log Type</th>
                                    <th>Maker</th>
                                    <th>Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    logs.map(
                                        e => (
                                            <tr key={e.id}>
                                                <td>{logs.indexOf(e) + 1}</td>
                                                <td>{e.logType}</td>
                                                <td>{!e.applicant ? /*e.admin.firstName + ' ' + e.admin.lastName*/"Admin" : e.applicant.firstName + ' ' + e.applicant.lastName}</td>
                                                <td>{moment(e.dateCreated).format('YYYY-MM-DD')}</td>
                                                <td><button className="btn btn-warning" onClick={() => deleteLogClicked(e.id)}>Delete</button></td>
                                                <td><button className="btn btn-success" onClick={() => ShowApplicantClicked(e.applicant.id)}>Show Maker Info</button></td>
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

export default Archive;

