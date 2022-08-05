import axios from "axios"

class LogDataService {

    retrieveAllLogs() {
        return axios.get(`http://localhost:8080/logs`);
        /* return useFetch('http://localhost:8080/logs'); */
    }

    retrieveLog(id) {
        return axios.get(`http://localhost:8080/logs/${id}`);
    }

    deleteLog(id) {
        return axios.delete(`http://localhost:8080/logs/${id}`);
    }

    updateLog(id, log) {
        return fetch(`http://localhost:8080/logs/${id}`, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(log)
        })
    }

    createLog(log) {
        return fetch('http://localhost:8080/logs', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(log)
        })
    }
}

export default new LogDataService()