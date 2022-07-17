import { useParams } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import ApplicantDataService from "../../api/ApplicantDataService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Applicant = () => {
    const navigete = useNavigate();
    const { id } = useParams();
    const [applicant, setApplicant] = useState(
        {
            id: id,
            firstName: '',
            lastName: '',
            email: '',
            birth: moment(new Date()).format('YYYY-MM-DD'),
            gender: '',
            nationality: '',
            degree: '',
            applyFor: '',
            job: '',
            aboutApplicant: ''
        });

    useEffect(() => {
        ApplicantDataService.retrieveApplicant(id)
            .then(response => {
                setApplicant({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    birth: moment(response.data.birth).format('YYYY-MM-DD'),
                    gender: response.data.gender,
                    nationality: response.data.nationality,
                    degree: response.data.degree,
                    applyFor: response.data.applyFor,
                    job: response.data.job,
                    aboutApplicant: response.data.aboutApplicant
                })
            }
            )
    }, [])

    return (
        <div>
            <h1 className="display-6">{applicant.firstName + ' ' + applicant.lastName}</h1>
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
                            <tr>
                                <td>{applicant.firstName}</td>
                                <td>{applicant.lastName}</td>
                                <td>{applicant.email}</td>
                                <td>{applicant.birth}</td>
                                <td>{applicant.gender}</td>
                                <td>{applicant.nationality}</td>
                                <td>{applicant.degree}</td>
                                <td>{applicant.applyFor}</td>
                                <td>{applicant.job}</td>
                                <td>{applicant.aboutApplicant}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Applicant;