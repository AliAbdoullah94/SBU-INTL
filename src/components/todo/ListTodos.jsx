import { useState } from "react";
import ToDoDataService from "../../api/ToDoDataService";

const ListTodos = () => {

    const [todo, setTodo] = useState({ id: '1', description: 'Learn React' });
    const [todos, setTodos] = useState([
        { id: '1', description: 'Learn React', done: false, targetDate: new Date() },
        { id: '2', description: 'Become an Expert', done: false, targetDate: new Date() },
        { id: '3', description: 'Visit Germany', done: false, targetDate: new Date() }
    ]);

    return (
        <div>
            <h1>List Todos</h1>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>Target Date</th>
                            <th>Is Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                e => (
                                    <tr key={e.id}>
                                        <td>{e.description}</td>
                                        <td>{e.done.toString()}</td>
                                        <td>{e.targetDate.toString()}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ListTodos;