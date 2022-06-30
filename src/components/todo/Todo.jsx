import { useParams } from "react-router-dom";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import ToDoDataService from "../../api/ToDoDataService";
import AuthenticationService from "../../auth/AuthenticationService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
    const navigete = useNavigate();
    const { id } = useParams();
    const [todo, setTodo] = useState(
        {
            id: id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        });
    
    useEffect(() => {
        if(id === -1){
            return
        }

        let username = AuthenticationService.getLoggedInUserName();
        ToDoDataService.retrieveTodo(username,id)  
            .then(response => {
                setTodo({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            })}
            )
    },[]) 
    

    let {description, targetDate}  = todo;
    
    const validate = (values) => {
        let errors = {};
        if(!values.description){
            errors.description = "Enter a description";
        }
        else if(values.description.length < 5) {
            errors.description = "Enter at least 5 letters";
        }
        if(!moment(values.targetDate).isValid()){
            console.log("not valid date")
            errors.targetDate = "Enter a valid Date";
        }
        return errors;
    }

    const onSubmit = (values) => {
        
        let createdTodo = {
            id: id,
            description: values.description,
            targetDate: values.targetDate
        }
        if (id == -1) {
            console.log('id = -1 so Creating')
            let username = AuthenticationService.getLoggedInUserName();
            ToDoDataService.createTodo(username, createdTodo)
                .then(
                    () => { navigete('/todos') }
                )
        } else {
            let username = AuthenticationService.getLoggedInUserName();
            ToDoDataService.updateTodo(username, id, createdTodo)
                .then(
                    () => { navigete('/todos') }
                )
        }
    }

    return (
        <div>
            <h1>Todo</h1>
            <div className="container">   
                <Formik
                    initialValues={{description,targetDate}}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={true}
                    validateOnBlur={true}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                             <Form>
                                <ErrorMessage className="alert alert-warning" name="description" component="div"/>
                                <ErrorMessage className="alert alert-warning" name="targetDate" component="div"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                             </Form>
                            )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default Todo;