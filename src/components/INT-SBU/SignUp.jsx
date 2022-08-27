import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AuthenticationService from '../../auth/AuthenticationService';
import MyTextInput from './MyFormikComponents/MyTextInput';
import MyCheckbox from './MyFormikComponents/MyCheckBox';
import ApplicantDataService from '../../api/ApplicantDataService';
import LogDataService from '../../api/LogDataService';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const SignUp = (outProps) => {
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        ApplicantDataService.retrieveAllApplicants()
            .then((response) => {
                setApplicants(response.data);
            }
            )
    }, [])

    const handleSubmit = (values) => {
        console.log("values", values);
        outProps.setIsLoggedIn(true);
        outProps.setEmail(values.email);

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

        console.log("Created Applicant", createdApplicant)
        console.log("Created Log", createdLog)
        ApplicantDataService.createApplicant(createdApplicant)
            .then(() => {
                LogDataService.createLog(createdLog, "signUp");
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
                                checkEmail: Yup.boolean(),
                                email: Yup.string()
                                    .email("Email should be valid and contain @")
                                    .required("Email is required")
                                    .when("checkEmail", {
                                        is: true,
                                        then: Yup.string()
                                            .test({
                                                message: () => "Email already exists",
                                                test: async (values) => {
                                                    if (values) {
                                                        try {
                                                            console.log("applicants", applicants)
                                                            let notFound = true;
                                                            if (applicants.length > 0) {
                                                                console.log("applicants.length is > 0");
                                                                applicants.forEach(element => {
                                                                    console.log("element.email is", element.email);
                                                                    console.log("Values are", values);
                                                                    if (element.email === values) {
                                                                        console.log("Found");
                                                                        notFound = false;
                                                                        console.log("Found value inside if (element.email === values)", notFound);
                                                                    }
                                                                });
                                                            } else {
                                                                notFound = true;
                                                                console.log("Found value inside else", notFound);
                                                            }
                                                            console.log("Found value", notFound);
                                                            return notFound;
                                                        } catch (error) {
                                                            console.log(error);
                                                        }
                                                    }
                                                },
                                            }),

                                    }),
                                password: Yup.string()
                                    .required('No password provided.')
                                    .min(3, 'Password is too short - should be 3 chars minimum.'),
                                confirmPassword: Yup.string()
                                    .required('Confirm Password')
                                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            })}
                            onSubmit={handleSubmit}
                        >
                            {props => (
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
                                            onBlur={(e) => {
                                                props.handleBlur(e);
                                                if (!props.errors.email) {
                                                    props.setValues({
                                                        ...props.values,
                                                        checkEmail: true,
                                                    })
                                                }
                                            }
                                            }
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
                            )}
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