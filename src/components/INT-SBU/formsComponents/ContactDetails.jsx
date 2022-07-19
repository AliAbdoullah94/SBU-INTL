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

const ContactDetails = (props) => {
    const medicalConditionValues = ['Hearing', 'Learning', 'Mobility', 'Visual', 'other'];
    const hearAboutUsWays = ['Education Agent', 'Career & Education Expo', 'Careers Adviser', 'Print / Newspaper', 'Word of Mouth', 'Internet'];
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const navigate = useNavigate();
    const str2bool = (value) => {
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") return true;
            if (value.toLowerCase() === "false") return false;
        }
        return value;
    }

    const handleSubmit = (values) => {
        console.log(values.hasMedicalCondition);

        /* let email = props.email;
        console.log("values", values);

        let createdApplicant = {
            email: email,
            address: values.address,
            medicalCondition: values.medicalCondition,
            hearAboutUs: values.hearAboutUs,
            birth: values.birth,
            city: values.city,
            aboutApplicant: values.aboutApplicant
        }

        let createdForm = {
            applicant: createdApplicant,
            hearAboutUs: values.hearAboutUs,
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
            <div className="container ">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-6 border border-5 p-3 mb-2 shadow-lg p-3">
                        <h1 className='fs-1 badge bg-primary text-wrap '>Contact Details</h1>
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                address: 'Velenjak - Bolvar',
                                city: 'Damascus',
                                mobile: '09901234567',
                                hasMedicalCondition: str2bool("false"),
                                medicalConditions: medicalConditionValues[1],
                                hearAboutUs: hearAboutUsWays[0],
                            }}
                            validationSchema={Yup.object({
                                address: Yup.string()
                                    .required('Required'),
                                city: Yup.string()
                                    .required('Required'),
                                mobile: Yup.string()
                                    .required('Required')
                                    .matches(phoneRegExp, 'Phone number is not valid'),
                                hasMedicalCondition: Yup.boolean()
                                    .required('Required'),
                                medicalConditions: Yup.array().of(Yup.string())
                                    .required('Required'),
                                hearAboutUs: Yup.array().of(Yup.string())
                                    .required('Required'),
                            })}
                            onSubmit={handleSubmit}
                        >
                            {({ values }) => (
                                <Form >

                                    <div class="row g-2 text-start">
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

                                    <div id="has-medical-condition-group" className="form-group fw-bold text-start">Do You have any medical Conditions?</div>
                                    <div role="group" aria-labelledby="has-medical-condition-group">
                                        <label className="form-group" >
                                            <Field type="radio" name="hasMedicalCondition" value="true" />
                                            Yes
                                        </label>
                                        <label className="form-group">
                                            <Field type="radio" name="hasMedicalCondition" value="false" />
                                            No
                                        </label>
                                    </div>

                                    {str2bool(values.hasMedicalCondition) && <fieldset className="form-group ">
                                        <div className="form-group fw-bold text-start"> What are they ?</div>
                                        {medicalConditionValues.map(e => (
                                            <MyCheckbox key={e} name="medicalConditions" value={e}>
                                                {e}
                                            </MyCheckbox>
                                        ))}
                                    </fieldset>}

                                    <fieldset className="form-group">
                                        <div className="form-group fw-bold text-start"> How did you hear about us?</div>
                                        {hearAboutUsWays.map(e => (
                                            <MyCheckbox key={e} name="hearAboutUs" className="text-center" value={e}>
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