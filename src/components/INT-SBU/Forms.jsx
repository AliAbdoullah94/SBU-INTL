import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDataService from "../../api/FormDataService";
import AuthenticationService from "../../auth/AuthenticationService";

const Forms = () => {

    const [forms, setForms] = useState([]);
    const [message, setMessage] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        FormDataService.retrieveAllForms()
        .then(
            response => {
                setForms(response.data)
            }
        )
      }, [forms, message])

    const deleteFormClicked = (id) => {
        /* let username = AuthenticationService.getLoggedInUserName(); */
        FormDataService.deleteForm(id)
        .then(
            response => {
                setMessage(`Delete of form ${id} succesfull`)
            }
        )
    }  

    const ShowApplicantClicked = (id) => {
        navigator(`/applicants/${id}`)
    }

    return (
        <div>
            <h1>Forms</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Response</th>
                            <th>Apply For</th>
                            <th>Date Created</th>
                            <th>About Applicant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            forms.map(
                                e => (
                                    <tr key={e.id}>
                                        <td>{e.applicant.firstName + ' ' + e.applicant.lastName}</td>
                                        <td>{!e.response ? "Not yet": e.response}</td>
                                        <td>{e.applyFor}</td>
                                        <td>{moment(e.dateCreated).format('YYYY-MM-DD')}</td>
                                        <td>{e.aboutApplicant}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteFormClicked(e.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => ShowApplicantClicked(e.applicant.id)}>Show Applicant Info</button></td>
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

export default Forms; 

