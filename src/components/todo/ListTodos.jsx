import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToDoDataService from "../../api/ToDoDataService";
import AuthenticationService from "../../auth/AuthenticationService";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        let username = AuthenticationService.getLoggedInUserName();
        ToDoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    setTodos(response.data)
                }
            )
    }, [todos, message])

    const deleteTodoClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName();
        ToDoDataService.deleteTodo(username, id)
            .then(
                response => {
                    setMessage(`Delete of to do ${id} succesfull`)
                }
            )
    }

    const updateTodoClicked = (id) => {
        navigator(`/todos/${id}`)
    }

    const addTodoClicked = () => {
        navigator(`/todos/-1`)
    }

    return (
        <div>
            <h1>List Todos</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Target Date</th>
                            <th>Is Completed</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                e => (
                                    <tr key={e.id}>
                                        <td>{e.description}</td>
                                        <td>{e.done.toString()}</td>
                                        <td>{moment(e.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodoClicked(e.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => updateTodoClicked(e.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={addTodoClicked}>Add</button>
            </div>

        </div>
    );
}

export default ListTodos;

/* const [todos, setTodos] = useState([
        { id: '1', description: 'Learn React', done: false, targetDate: new Date() },
        { id: '2', description: 'Become an Expert', done: false, targetDate: new Date() },
        { id: '3', description: 'Visit Germany', done: false, targetDate: new Date() }
    ]); */