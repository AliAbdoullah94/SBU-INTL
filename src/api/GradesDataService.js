import axios from "axios"

class GradesDataService {

    retrieveAllGrades() {
        return axios.get(`http://localhost:8080/grades`);
        /* return useFetch('http://localhost:8080/grades'); */
    }

    retrieveGrades(id) {
        return axios.get(`http://localhost:8080/grades/${id}`);
    }

    deleteGrades(id) {
        return axios.delete(`http://localhost:8080/grades/${id}`);
    }

    updateGrades(id, grade) {
        return fetch(`http://localhost:8080/grades/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(grade)
        })
    }

    createGrades(grade) {
        return fetch('http://localhost:8080/grades', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(grade)
        })
    }
}

export default new GradesDataService()