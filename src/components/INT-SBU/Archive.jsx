import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogDataService from "../../api/LogDataService";
import AuthenticationService from "../../auth/AuthenticationService";

const Archive = () => {

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
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Log Type</th>
                            <th>Maker</th>
                            <th>Date Created</th>
                            <th>Form Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            logs.map(
                                e => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.logType}</td>
                                        <td>{!e.applicant ? e.admin.firstName + ' ' + e.admin.lastName : e.applicant.firstName + ' ' + e.applicant.lastName}</td>
                                        <td>{moment(e.dateCreated).format('YYYY-MM-DD')}</td>
                                        <td>{!e.form ? "Don't has": <button className="btn btn-success" onClick={() => ShowFormClicked(e.applicant.id)}>Show Form</button>}</td>
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
    );
}

export default Archive; 

