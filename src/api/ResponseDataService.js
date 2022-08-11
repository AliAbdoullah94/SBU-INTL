import axios from "axios"

class ResponseDataService {

    retrieveAllResponses() {
        return axios.get(`http://localhost:8080/responses`);
        /* return useFetch('http://localhost:8080/responses'); */
    }

    retrieveResponse(applicantEmail) {
        return axios.get(`http://localhost:8080/responses/${applicantEmail}`);
    }

    deleteResponse(applicantEmail) {
        return axios.delete(`http://localhost:8080/responses/${applicantEmail}`);
    }

    updateResponse(id, response) {
        return fetch(`http://localhost:8080/responses/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(response)
        })
    }

    createResponse(applicantEmail, response) {
        return fetch(`http://localhost:8080/responses/${applicantEmail}`, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(response)
        })
    }
}

export default new ResponseDataService()