import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthenticationService from '../../auth/AuthenticationService';
import MyTextInput from './MyFormikComponents/MyTextInput';
import CourseDataService from '../../api/CourseDataService';
import LogDataService from '../../api/LogDataService';
import { useNavigate } from 'react-router-dom';


const Course = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log("values", values);

        let createdCourse = {
            courseName: values.courseName,
            description: values.description,
            units: values.units,
            password: values.password,
            confirmPassword: values.confirmPassword,
        }

        let createdLog = {
            logType: 'add Course',
            dateCreated: new Date(),
        }

        console.log("Created Course", createdCourse)
        CourseDataService.createCourse(createdCourse)
            .then(() => {
                LogDataService.createLog(createdLog, "add Course");
            }
            ).then(() => {
                console.log("Log created")
                navigate(`/courses`)
            }
            )


    }

    return (
        <div className="App ">
            <div className="container fw-bold">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 border border-5 p-3 mb-2 shadow-lg p-3">
                    <h1 className='fs-1 badge bg-primary text-wrap text-center'>Add Course </h1>
                        <Formik
                            initialValues={{
                                courseName: 'Software Engineering',
                                description: 'Fundemental Course For..',
                                units: 1,
                            }}
                            validationSchema={Yup.object({
                                courseName: Yup.string()
                                    .required('Required'),
                                description: Yup.string()
                                    .required('Required'),
                                units: Yup.number()
                                    .integer()
                                    .min(1,"Course must has 1 unit at least")
                                    .max(4,"Course can't has more than 4 units")
                                    .required('Required'),
                            })}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="Course Name"
                                        name="courseName"
                                        type="text"
                                        placeholder="Software Engineering"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="Description"
                                        name="description"
                                        type="text"
                                        placeholder="Fundemental Course For.."
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="Course Units"
                                        name="units"
                                        type="text"
                                        placeholder="choose a valuee from 1 to 4"
                                    />
                                </fieldset>

                                
                                <button type="submit" className="btn btn-primary">Submit</button>

                            </Form>
                        </Formik>
                        
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Course;