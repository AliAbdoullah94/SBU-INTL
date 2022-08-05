import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import AuthenticationService from '../../auth/AuthenticationService';
import MyTextInput from './MyFormikComponents/MyTextInput';
import MyTextArea from './MyFormikComponents/MyTextArea';
import MyCheckbox from './MyFormikComponents/MyCheckBox';
import MySelect from './MyFormikComponents/MySelect';
import ApplicantDataService from '../../api/ApplicantDataService';
import { useNavigate } from 'react-router-dom';
import FormDataService from '../../api/FormDataService';

const Apply = (props) => {
    const degrees = ['High School', 'Bachelor', 'Master'];
    const degreesToApp = ['Bachelor', 'Master', 'PHD'];
    const jobs = ['None', 'designer', 'development', 'product', 'other'];
    const navigate = useNavigate();


    const handleSubmit = (values) => {
        let email = props.email;
        console.log("values", values);

        let createdApplicant = {
            email: email,
            nationality: values.nationality,
            degree: values.degree,
            applyFor: values.applyFor,
            birth: values.birth,
            gender: values.gender,
            job: values.job,
            aboutApplicant: values.aboutApplicant
        }

        let createdForm = {
            applicant: createdApplicant,
            applyFor: values.applyFor,
            dateCreated: new Date(),
            aboutApplicant: values.aboutApplicant
        }

        console.log("created", createdApplicant);

        ApplicantDataService.updateApplicant(email, createdApplicant)
            .then(() => {
                console.log(createdApplicant);
                FormDataService.createForm(createdForm)
            }
            ).then(() => {
                console.log("Form Sent")
                navigate('/forms')
            }
            )


    }

    return (
        <div className="App ">
            <div className="container fw-bold">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-5 border border-5 p-3 mb-2 shadow-lg p-3 ">
                        <h1 className='fs-1 badge bg-primary text-end text-wrap' >Apply!</h1>
                        <Formik
                            initialValues={{
                                nationality: 'Syrian',
                                degree: degrees[0],
                                highSchoolDoc: undefined,
                                bachelorDoc: undefined,
                                MasterDoc: undefined,
                                applyFor: degreesToApp[0],
                                birth: new Date(),
                                gender: 'male',
                                acceptedTerms: true,
                                job: jobs[1],
                                aboutApplicant: 'epsom lorem',
                            }}
                            validationSchema={Yup.object({
                                nationality: Yup.string()
                                    .required('Required'),
                                degree: Yup.string()
                                    .required('Required')
                                    .oneOf(degrees, 'The degree you chose does not exist'),
                                applyFor: Yup.string()
                                    .required('Required')
                                    .oneOf(degreesToApp, 'The degree you chose does not exist'),
                                birth: Yup.date()
                                    .required('Required'),
                                gender: Yup.string()
                                    .required('Required'),
                                acceptedTerms: Yup.boolean()
                                    .required('Required')
                                    .oneOf([true], 'You must accept the terms and conditions.'),
                                job: Yup.string()
                                    .required('Required'),
                            })
                                .shape({
                                    highSchoolDoc: Yup
                                        .mixed()
                                        .required("A file is required"),
                                    bachelorDoc: Yup
                                        .mixed()
                                        .required("A file is required"),
                                    masterDoc: Yup
                                        .mixed()
                                        .required("A file is required")
                                })
                            }
                            onSubmit={handleSubmit}
                        >
                            {({ values }) => (
                                <Form>

                                    <div className="row g-2 text-start fw-bold">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Birth"
                                                        name="birth"
                                                        type="date"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Nationality"
                                                        name="nationality"
                                                        type="text"
                                                        placeholder="Syrian"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row g-2 text-start fw-bold">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MySelect label="Current Degree" name="degree">
                                                        {degrees.map(e => (
                                                            <option key={e} value={e} >{e}</option>
                                                        )
                                                        )}
                                                    </MySelect>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group fw-bold">
                                                    <label>Upload High School Image</label>
                                                    <Field className="form-control" type="file" name="highSchoolDoc" />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    {(values.degree === 'Bachelor' || values.degree === 'Master') &&
                                        <fieldset className="form-group fw-bold">
                                            <label>Upload Bachelor Image</label>
                                            <Field className="form-control" type="file" name="bachelorDoc" />
                                        </fieldset>}

                                    {values.degree === 'Master' &&
                                        <fieldset className="form-group fw-bold">
                                            <label>Upload Master Image</label>
                                            <Field className="form-control" type="file" name="masterDoc" />
                                        </fieldset>}

                                    <fieldset className="form-group">
                                        <MySelect label="Apply For" name="applyFor">
                                            {degreesToApp.filter(e => e != 'None').map(e => (
                                                <option key={e} value={e} >{e}</option>
                                            )
                                            )}
                                        </MySelect>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <MySelect label="Job Type" name="job">
                                            {jobs.map(e => (
                                                <option key={e} value={e} >{e}</option>
                                            )
                                            )}
                                        </MySelect>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <MySelect label="Gender" name="gender">
                                            <option value="male" >Male</option>
                                            <option value="female" >Female</option>
                                        </MySelect>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <MyTextArea
                                            label="Express Yourself in less than 3 lines"
                                            name="aboutApplicant"
                                            type="text"
                                            placeholder="About me"
                                        />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <MyCheckbox name="acceptedTerms">
                                            I accept the terms and conditions
                                        </MyCheckbox>
                                    </fieldset>

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

export default Apply;