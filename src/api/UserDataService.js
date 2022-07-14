import axios from "axios"

class UserDataService {

    retrieveAllUsers() {
        return axios.get(`http://localhost:8080/users`);
        /* return useFetch('http://localhost:8080/users'); */
    }

    retrieveUser(email) {
        return axios.get(`http://localhost:8080/users/${email}`);
    }

    deleteUser(email) {
        return axios.delete(`http://localhost:8080/users/${email}`);
    }

    updateUser(email, user) {
        return fetch(`http://localhost:8080/users/${email}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user)
        })
    }

    createUser(user) {
        return fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user)
        })
    }
}

export default new UserDataService()