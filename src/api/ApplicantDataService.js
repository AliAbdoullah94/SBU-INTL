import axios from "axios"

class ApplicantDataService {

    retrieveAllApplicants() {
        return axios.get(`http://localhost:8080/applicants`);
        /* return useFetch('http://localhost:8080/applicants'); */
    }

    retrieveApplicant(email) {
        return axios.get(`http://localhost:8080/applicants/${email}`);
    }

    deleteApplicant(email) {
        return axios.delete(`http://localhost:8080/applicants/${email}`);
    }

    updateApplicant(email, applicant) {
        return fetch(`http://localhost:8080/applicants/${email}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(applicant)
        })
    }

    createApplicant(applicant) {
        return fetch('http://localhost:8080/applicants', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(applicant)
        })
    }
}

export default new ApplicantDataService()