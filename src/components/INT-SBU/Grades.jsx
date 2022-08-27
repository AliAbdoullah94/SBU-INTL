import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthenticationService from '../../auth/AuthenticationService';
import MyTextInput from './MyFormikComponents/MyTextInput';
import MySelect from './MyFormikComponents/MySelect';
import CourseDataService from '../../api/CourseDataService';
import SemesterDataService from '../../api/SemesterDataService';
import LogDataService from '../../api/LogDataService';
import GradesDataService from '../../api/GradesDataService';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Grades = (props) => {
    const semesters = ["22_Summer", "22_Fall", "23_Winter", "23_Summer", "23_Fall"]
    const [semesterId, setSemesterId] = useState(-1);
    const navigate = useNavigate();


    const [grades, setGrades] = useState([]);
    const [student, setStudent] = useState({});
    const [students, setStudents] = useState([]);

    const [courses, setCourses] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        CourseDataService.retrieveAllCourses()
            .then(
                response => {
                    setCourses(response.data)
                }
            )

    }, [courses])

    const addStudent = (values) => {
        console.log("Values", values);
        let tempStudents = students;
        let inputtedStudent = {
            stId: values.stId,
            grade: values.grade
        }
        let obj = students.find(o => o.stId === values.stId);
        if (obj) {
            let index = students.indexOf(obj);
            delete students[index];
        }
        tempStudents.push(inputtedStudent);
        setStudents(tempStudents);
    }

    const handleSubmit = (values) => {
        console.log("values", values);

        let createdSemester = {
            semesterName: values.semester,
        }

        let createdLog = {
            logType: 'add Semester',
            dateCreated: new Date(),
        }
        SemesterDataService.createSemester(createdSemester)
            .then((resp) => {
                semesterId(resp.data)
                LogDataService.createLog(createdLog, "add Semester");
            }
            ).then(() => {
                console.log("Log created")
            }
            )


        let createdGrades = {
            courseId: values.courseId,
            semesterId: semesterId,
            units: values.units,///////////////////
            password: values.password,
            confirmPassword: values.confirmPassword,
        }

        let createdLogGrades = {
            logType: 'add Grades',
            dateCreated: new Date(),
        }

        console.log("Created Grades", createdGrades)
        GradesDataService.createGrades(createdGrades)
            .then(() => {
                LogDataService.createLog(createdLogGrades, "add Grades");
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
                    <div className="col-md-6 border border-5 p-3 mb-2 shadow-lg p-3">
                        <h1 className='fs-1 badge bg-primary text-wrap text-center'>Add Grades</h1>
                        <Formik
                            initialValues={{
                                courseId: -1,
                                semester: semesters[0],
                                stId: "0000",
                                grade: 20
                            }}
                            validationSchema={Yup.object({
                                stId: Yup.string()
                                    .required()
                                    .matches(/^[0-9]+$/, "Must be only digits")
                                    .min(4, 'Must be exactly 5 digits')
                                    .max(4, 'Must be exactly 5 digits'),
                                grade: Yup.number()
                                    .required()
                                    .min(0, "Grade can't be less than zero digits")
                                    .max(20, "Grade can't be More than 20 digits"),
                            })}
                            onSubmit={handleSubmit}
                        >
                            {({ values }) => (
                                <Form>
                                    <div className="row g-2 text-start fw-bold">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MySelect label="Course Name" name="courseId">
                                                        {courses.map(e => (
                                                            <option key={e.courseId} value={e.courseId} >{e.courseName}</option>
                                                        )
                                                        )}
                                                    </MySelect>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MySelect label="Semester" name="semester">
                                                        {semesters.map(e => (
                                                            <option key={e.id} value={e} >{e}</option>
                                                        )
                                                        )}
                                                    </MySelect>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-2 text-start fw-bold">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Student ID"
                                                        name="stId"
                                                        type="text"
                                                        placeholder="ST ID"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Grade"
                                                        name="grade"
                                                        type="text"
                                                        placeholder="Grade"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>


                                    <button type="button" className="btn btn-primary" onClick={() => addStudent(values)}>Add Student</button>


                                    <div className="col-md">
                                        <div className="form-floating">
                                            <fieldset className="form-group">

                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">

                                        </div>
                                    </div>

                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Student ID</th>
                                                <th>Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                students.map(
                                                    e => (
                                                        <tr key={e}>
                                                            <td>{e.stId}</td>
                                                            <td>{e.grade}</td>
                                                        </tr>
                                                    ))
                                            }
                                        </tbody>
                                    </table>


                                    <button type="submit" className="btn btn-primary">Submit</button>

                                </Form>
                            )}
                        </Formik>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Grades;