import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import AuthenticationService from '../../auth/AuthenticationService';
import MyTextInput from './MyFormikComponents/MyTextInput';
import MyTextArea from './MyFormikComponents/MyTextArea';
import MyCheckbox from './MyFormikComponents/MyCheckBox';
import MySelect from './MyFormikComponents/MySelect';
import ApplicantDataService from '../../api/ApplicantDataService';
import { useNavigate } from 'react-router-dom';
import FormDataService from '../../api/FormDataService';

const Apply = () => {
    const degrees = ['None', 'Bachelor', 'Master', 'PHD'];
    const degreesToApp = ['Bachelor', 'Master', 'PHD'];
    const jobs = ['None', 'designer', 'development', 'product', 'other'];
    const navigate = useNavigate();


    const handleSubmit = (values) => {
        let email = AuthenticationService.getLoggedInUserName();
        console.log("values", values);

        let createdApplicant = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            nationality: values.nationality,
            degree: values.degree,
            applyFor: values.applyFor,
            birth: values.birth,
            gender: values.gender,
            job: values.job,
            aboutApplicant: values.aboutApplicant
        }

        console.log("created", createdApplicant);

        ApplicantDataService.createApplicant(createdApplicant)
            .then(
                console.log("Applicant Sent")
            )

        let createdForm = {
            applicant: createdApplicant,
            applyFor: values.applyFor,
            dateCreated: new Date(),
            aboutApplicant: values.aboutApplicant
        }

        FormDataService.createForm(createdForm)
            .then(
                console.log("Form Sent")
            )
    }

    return (
        <div className="App ">
            <div className="container ">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <h1>Apply!</h1>
                        <Formik
                            initialValues={{
                                firstName: 'Ali',
                                lastName: 'Abd',
                                email: 'testApply@mail.com',
                                nationality: 'Syrian',
                                degree: degrees[0],
                                applyFor: degreesToApp[0],
                                birth: new Date(),
                                gender: 'male',
                                acceptedTerms: false,
                                job: '',
                                aboutApplicant: 'epsom lorem',
                            }}
                            validationSchema={Yup.object({
                                firstName: Yup.string()
                                    .max(15, 'Must be 15 characters or less')
                                    .required('Required'),
                                lastName: Yup.string()
                                    .max(20, 'Must be 20 characters or less')
                                    .required('Required'),
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .required('Required'),
                                nationality: Yup.string()
                                    .required('Required'),
                                degree: Yup.string()
                                    .required('Required')
                                    .oneOf(['None', 'Bachelor', 'Master', 'PHD'], 'The degree you chose does not exist'),
                                applyFor: Yup.string()
                                    .required('Required')
                                    .oneOf(['Bachelor', 'Master', 'PHD'], 'The degree you chose does not exist'),
                                birth: Yup.date()
                                    .required('Required'),
                                gender: Yup.string()
                                    .required('Required'),
                                acceptedTerms: Yup.boolean()
                                    .required('Required')
                                    .oneOf([true], 'You must accept the terms and conditions.'),
                                job: Yup.string()
                                    .required('Required'),
                            })}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="First Name"
                                        name="firstName"
                                        type="text"
                                        placeholder="Ali"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="Last Name"
                                        name="lastName"
                                        type="text"
                                        placeholder="Abdoullah"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="birth"
                                        name="birth"
                                        type="date"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="nationality"
                                        name="nationality"
                                        type="text"
                                        placeholder="Syrian"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder="jane@formik.com"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <MySelect label="Degree" name="Degree">
                                        {degrees.map(e => (
                                            <option key={e} value={e} >{e}</option>
                                        )
                                        )}
                                    </MySelect>
                                </fieldset>

                                <fieldset className="form-group">
                                    <MySelect label="applyFor" name="applyFor">
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
                                    <MySelect label="gender" name="gender">
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
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Apply;