import axios from "axios"

class StudentDataService {

    retrieveAllStudents() {
        return axios.get(`http://localhost:8080/students`);
        /* return useFetch('http://localhost:8080/students'); */
    }

    retrieveStudent(id) {
        return axios.get(`http://localhost:8080/students/${id}`);
    }

    deleteStudent(id) {
        return axios.delete(`http://localhost:8080/students/${id}`);
    }

    updateStudent(id, student) {
        return fetch(`http://localhost:8080/students/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(student)
        })
    }

    createStudent(stInfoObj) {
        return fetch('http://localhost:8080/students', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(stInfoObj)
        })
    }
}

export default new StudentDataService()