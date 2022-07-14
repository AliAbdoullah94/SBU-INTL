import axios from "axios"

class FormDataService {

    retrieveAllForms() {
        return axios.get(`http://localhost:8080/forms`);
        /* return useFetch('http://localhost:8080/forms'); */
    }

    retrieveForm(id) {
        return axios.get(`http://localhost:8080/forms/${id}`);
    }

    deleteForm(id) {
        return axios.delete(`http://localhost:8080/forms/${id}`);
    }

    updateForm(id, form) {
        return fetch(`http://localhost:8080/forms/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(form)
        })
    }

    createForm(form) {
        return fetch('http://localhost:8080/forms', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(form)
        })
    }
}

export default new FormDataService()