import axios from "axios"

class CourseDataService {

    retrieveAllCourses() {
        return axios.get(`http://localhost:8080/courses`);
        /* return useFetch('http://localhost:8080/courses'); */
    }

    retrieveCourse(id) {
        return axios.get(`http://localhost:8080/courses/${id}`);
    }

    deleteCourse(id) {
        return axios.delete(`http://localhost:8080/courses/${id}`);
    }

    updateCourse(id, course) {
        return fetch(`http://localhost:8080/courses/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(course)
        })
    }

    createCourse(course) {
        return fetch('http://localhost:8080/courses', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(course)
        })
    }
}

export default new CourseDataService()