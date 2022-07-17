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

const Apply = (props) => {
    const degrees = ['None', 'Bachelor', 'Master', 'PHD'];
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

        ApplicantDataService.updateApplicant(email,createdApplicant)
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
            <div className="container ">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <h1>Apply!</h1>
                        <Formik
                            initialValues={{
                                nationality: 'Syrian',
                                degree: degrees[1],
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
                                    <MySelect label="degree" name="degree">
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