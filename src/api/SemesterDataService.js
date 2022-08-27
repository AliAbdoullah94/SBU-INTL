import axios from "axios"

class SemesterDataService {

    retrieveAllSemesters() {
        return axios.get(`http://localhost:8080/semesters`);
        /* return useFetch('http://localhost:8080/semesters'); */
    }

    retrieveSemester(id) {
        return axios.get(`http://localhost:8080/semesters/${id}`);
    }

    deleteSemester(id) {
        return axios.delete(`http://localhost:8080/semesters/${id}`);
    }

    updateSemester(id, semester) {
        return fetch(`http://localhost:8080/semesters/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(semester)
        })
    }

    createSemester(semester) {
        return fetch('http://localhost:8080/semesters', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(semester)
        })
    }
}

export default new SemesterDataService()