import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthenticationService from '../../auth/AuthenticationService';
import MyTextInput from './MyFormikComponents/MyTextInput';
import MyCheckbox from './MyFormikComponents/MyCheckBox';
import ApplicantDataService from '../../api/ApplicantDataService';
import LogDataService from '../../api/LogDataService';
import { useNavigate } from 'react-router-dom';


const SignUp = (props) => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log("values", values);
        props.setIsLoggedIn(true);
        props.setEmail(values.email);

        let createdApplicant = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        }

        let createdLog = {
            logType: 'SignUp',
            applicant: createdApplicant,
            dateCreated: new Date(),
        }

        console.log("Created Applicant",createdApplicant)
        console.log("Created Log",createdLog)
        ApplicantDataService.createApplicant(createdApplicant)
            .then(() => {
                LogDataService.createLog(createdLog,"signUp");
            }
            ).then(() => {
                console.log("Log created")
                AuthenticationService.registerSuccesfullLogin(values.firstName)
                navigate(`/welcome/${values.firstName}`)
            }
            )


    }

    return (
        <div className="App ">
            <div className="container fw-bold">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 border border-5 p-3 mb-2 shadow-lg p-3">
                        <h1>Sign Up!</h1>
                        <Formik
                            initialValues={{
                                firstName: 'Ali',
                                lastName: 'Abdoullah',
                                email: 'testSignUp@mail.com',
                                password: '1234',
                                confirmPassword: '1234',
                                acceptedTerms: true,
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
                                password: Yup.string()
                                    .required('No password provided.')
                                    .min(3, 'Password is too short - should be 3 chars minimum.'),
                                confirmPassword: Yup.string()
                                    .required('Confirm Password'),
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
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder="jane@formik.com"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <MyTextInput
                                        label="Retype Your Password"
                                        name="confirmPassword"
                                        type="password"
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
                        <p className="forgot-password text-right">
                            Already registered <a href="/Login">Login?</a>
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SignUp;