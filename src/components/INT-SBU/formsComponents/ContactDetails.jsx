import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import AuthenticationService from '../../../auth/AuthenticationService';
import MyTextInput from '../MyFormikComponents/MyTextInput';
import MyTextArea from '../MyFormikComponents/MyTextArea';
import MyCheckbox from '../MyFormikComponents/MyCheckBox';
import MySelect from '../MyFormikComponents/MySelect';
import ApplicantDataService from '../../../api/ApplicantDataService';
import { useNavigate } from 'react-router-dom';
import FormDataService from '../../../api/FormDataService';
import {medicalConditionValues, hearAboutUsValues, phoneRegExp, str2bool} from './resources'

const ContactDetails = (props) => {
    
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log(values.hasMedicalCondition);

        /* let email = props.email;
        console.log("values", values);

        let createdApplicant = {
            email: email,
            address: values.address,
            medicalCondition: values.medicalCondition,
            hearAboutUsWays: values.hearAboutUsWays,
            birth: values.birth,
            city: values.city,
            aboutApplicant: values.aboutApplicant
        }

        let createdForm = {
            applicant: createdApplicant,
            hearAboutUsWays: values.hearAboutUsWays,
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
 */

    }

    return (
        <div className="App ">
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-6 border border-5 p-3 mb-2 shadow-lg p-3">
                        <h1 className='fs-1 badge bg-primary text-wrap text-center'>Contact Details</h1>
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                address: 'Velenjak - Bolvar',
                                city: 'Damascus',
                                mobile: '09901234567',
                                phone: '0211234567',
                                hasMedicalCondition: str2bool("false"),
                                medicalConditions: medicalConditionValues[1],
                                hearAboutUsWays: hearAboutUsValues[0],
                            }}
                            validationSchema={Yup.object({
                                address: Yup.string()
                                    .required('Required'),
                                city: Yup.string()
                                    .required('Required'),
                                mobile: Yup.string()
                                    .required('Required')
                                    .matches(phoneRegExp, 'Phone number is not valid'),
                                phone: Yup.string()
                                    .required('Required')
                                    .matches(phoneRegExp, 'Phone number is not valid'),
                                hasMedicalCondition: Yup.boolean()
                                    .required('Required'),
                                medicalConditions: Yup.array().of(Yup.string())
                                    .required('Required'),
                                hearAboutUsWays: Yup.array().of(Yup.string())
                                    .required('Required'),
                            })}
                            onSubmit={handleSubmit}
                        >
                            {({ values }) => (
                                <Form >

                                    <div class="row g-2 text-start fw-bold">
                                        <div class="col-md">
                                            <div class="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Address"
                                                        name="address"
                                                        type="text"
                                                        placeholder="Address"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="col-md">
                                            <div class="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="City"
                                                        name="city"
                                                        type="text"
                                                        placeholder="Damas"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row g-2 text-start fw-bold">
                                        <div class="col-md">
                                            <div class="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Mobile"
                                                        name="mobile"
                                                        type="text"
                                                        placeholder="Mobile Num"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="col-md">
                                            <div class="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Phone"
                                                        name="phone"
                                                        type="text"
                                                        placeholder="Phone Num"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="has-medical-condition-group" className="form-check fw-bold text-start">Do you suffer from any medical condition/disability that may affect your studies?</div>
                                    <div role="group" aria-labelledby="has-medical-condition-group" className='form-check text-start'>
                                        <Field type="radio" className="form-check-input" name="hasMedicalCondition" value="true" id="hasMedicalCondition" />
                                        <label className="form-check-label" for="hasMedicalCondition">Yes</label>
                                    </div>
                                    <div role="group" aria-labelledby="has-medical-condition-group" className='form-check text-start'>
                                        <Field type="radio" className="form-check-input" name="hasMedicalCondition" value="false" id="hasMedicalCondition" />
                                        <label className="form-check-label" for="hasMedicalCondition">No</label>
                                    </div>

                                    {str2bool(values.hasMedicalCondition) && <fieldset className="form-check text-start">
                                        <div className="form-check-label  fw-bold text-start"> Please specify from the following..</div>
                                        {medicalConditionValues.map(e => (
                                            <MyCheckbox key={e} name="medicalConditions" className="form-check-input text-center" id="flexCheckDefault" value={e}>
                                                {e}
                                            </MyCheckbox>
                                        ))}
                                    </fieldset>}

                                    <fieldset className="form-check text-start">
                                        <label className="form-check-label fw-bold text-start"> How did you hear about us?</label>
                                        {hearAboutUsValues.map(e => (
                                            <MyCheckbox key={e} name="hearAboutUsWays" className="form-check-input text-center" id="flexCheckDefault" value={e}>
                                                {e}
                                            </MyCheckbox>
                                        ))}
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

export default ContactDetails;