import { useParams } from "react-router-dom";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import ResponseDataService from "../../api/ResponseDataService";
import AuthenticationService from "../../auth/AuthenticationService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogDataService from "../../api/LogDataService";
import StudentDataService from "../../api/StudentDataService";

const Response = () => {
    const navigete = useNavigate();
    const { applicantEmail, responseId, applicantId } = useParams();
    const [response, setResponse] = useState(
        {
            applicantEmail: applicantEmail,
            accepted: false,
            responseText: '',
            dateCreated: undefined,
        });

    const [stId, setStId] = useState(-1);

    useEffect(() => {
        console.log("From Response Use Effect responseId =", responseId);
        console.log("From Response Use Effect applicantEmail =", applicantEmail);
        // First Time Response
        if (responseId === "new") {
            return
        }

        let username = AuthenticationService.getLoggedInUserName();
        ResponseDataService.retrieveResponse(responseId)
            .then(response => {
                setResponse({
                    responseText: response.data.responseText,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                })
            }
            )
    }, [])


    let { accepted, responseText } = response;

    const validate = (values) => {
        let errors = {};
        if (!values.responseText) {
            errors.responseText = "Enter a responseText";
        }
        else if (values.responseText.length < 5) {
            errors.responseText = "Enter at least 5 letters";
        }
        
        return errors;
    }



    const onSubmit = (values) => {
        console.log(values)

        let createdResponse = {
            responseText: values.responseText,
            accepted: values.accepted,
            dateCreated: new Date(),
        }

        let createdLog = {
            logType: 'Response',
            response: createdResponse,
            dateCreated: new Date(),
        }

        let createdStuInfo = {
            applicantId: applicantId, // todo: change
            stId: values.stId,
        }



        if (responseId === "new") {
            console.log('responseId = new so Creating response')
            let username = AuthenticationService.getLoggedInUserName();
            ResponseDataService.createResponse(applicantEmail, createdResponse)
                .then(
                    (resp) => {
                        LogDataService.createLog(createdLog, applicantEmail)
                    }
                )
                .then(
                    (resp) => {
                        console.log("Sending createdStu",createdStuInfo)
                        StudentDataService.createStudent(createdStuInfo)
                    }
                )
                .then(
                    () => { navigete('/responses') }
                )
        } else {
            let username = AuthenticationService.getLoggedInUserName();
            ResponseDataService.updateResponse(responseId, createdResponse)
                .then(
                    () => { navigete('/responses') }
                )
        }
    }

    return (
        <div className="App ">
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-6 border border-5 p-3 mb-2 shadow-lg p-3">
                        <h1 className='fs-1 badge bg-primary text-wrap text-center'>Response</h1>
                        <div className="container">
                            <Formik
                                initialValues={{ accepted, responseText }}
                                onSubmit={onSubmit}
                                validate={validate}
                                validateOnChange={true}
                                validateOnBlur={true}
                                enableReinitialize={true}
                            >
                                {({ values }) => (
                                        <Form>
                                            <ErrorMessage className="alert alert-warning" name="responseText" component="div" />

                                            <div id="accepted-group" className="form-check fw-bold text-start">Apply request Accepted ?</div>
                                            <div role="group" aria-labelledby="accepted-group" className='form-check text-start'>
                                                <Field type="radio" className="form-check-input" name="accepted" value="true" id="accepted" />
                                                <label className="form-check-label" htmlFor="accepted">Yes</label>
                                            </div>
                                            <div role="group" aria-labelledby="accepted-group" className='form-check text-start'>
                                                <Field type="radio" className="form-check-input" name="accepted" value="false" id="accepted" />
                                                <label className="form-check-label" htmlFor="accepted">No</label>
                                            </div>

                                            <fieldset className="form-group">
                                                <label>Response Text</label>
                                                <Field className="form-control" type="text" name="responseText" />
                                            </fieldset>

                                            {values.accepted && <fieldset className="form-group">
                                                <label>Give This Applicant a Student Id:</label>
                                                <Field className="form-control" type="text" name="stId" />
                                            </fieldset>}



                                            <button type="submit" className="btn btn-success">Send Reply</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Response;