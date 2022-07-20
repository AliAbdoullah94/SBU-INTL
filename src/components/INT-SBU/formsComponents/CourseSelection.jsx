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
import { faculties, visaTypes, medicalConditionValues, hearAboutUsValues, phoneRegExp, str2bool, countryList } from './resources'
import { useState } from 'react';

const CourseSelection = (props) => {

    const navigate = useNavigate();
    const [wishList, setWishList] = useState(['123', '456']);
    const handleSubmit = (values) => {
        console.log(values.hasVisa);

        /* let email = props.email;
        console.log("values", values);

        let createdApplicant = {
            email: email,
            VisaNumber: values.VisaNumber,
            medicalCondition: values.medicalCondition,
            hearAboutUsWays: values.hearAboutUsWays,
            birth: values.birth,
            VisaExpiry: values.VisaExpiry,
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
                        <h1 className='fs-1 badge bg-primary text-wrap text-center'>Course Selection</h1>
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                faculity: faculties['Faculty of Electrical Engineering'],
                                department: faculties['Faculty of Electrical Engineering'][0],
                                PassExpiry: new Date(),
                                VisaNumber: '123456',
                                VisaExpiry: new Date(),
                                hasVisa: str2bool("false"),
                            }}
                            validationSchema={Yup.object({
                                department: Yup.string()
                                    .required('Required'),
                                PassExpiry: Yup.date()
                                    .required('Required'),
                                VisaNumber: Yup.string()
                                    .required('Required'),
                                VisaExpiry: Yup.date()
                                    .required('Required'),
                                hasVisa: Yup.boolean()
                                    .required('Required'),
                            })}
                            onSubmit={handleSubmit}
                        >
                            {({ values }) => (
                                <Form >

                                    <fieldset className="form-group fw-bold">
                                        <MySelect label="Faculity" name="faculity">
                                            {
                                                Object.keys(faculties).map(key => {
                                                    return (<option key={key} value={key}> {key}</option>)
                                                })
                                            }
                                        </MySelect>
                                    </fieldset>

                                    <fieldset className="form-group fw-bold">
                                        <MySelect label="Department" name="department">
                                            {
                                                faculties['Faculty of Computer Engineering and Science'].map(e => (
                                                    <option key={e} value={e} >{e}</option>
                                                )
                                                )
                                            }
                                        </MySelect>
                                    </fieldset>

                                    <button onClick={()=> setWishList(values.faculity)} className="btn btn-primary">Add</button>

                                    <fieldset className="form-group fw-bold">

                                    </fieldset>
                                    <div className='text-start'>
                                        {wishList.map((e) => {
                                            return (
                                                <div key={e}>
                                                    <h2>{e}</h2>
                                                    <hr />
                                                </div>
                                            );
                                        })}
                                    </div>



{/*                                     <fieldset className="form-group">
                                        <MyTextInput
                                            label="Passport Expiry"
                                            name="passExpiry"
                                            type="date"
                                            placeholder="Damas"
                                        />
                                    </fieldset>

                                    <div id="has-visa-group" className="form-check fw-bold text-start">Do you currently hold a valid visa of Iran?</div>
                                    <div role="group" aria-labelledby="has-visa-group" className='form-check text-start'>
                                        <Field type="radio" className="form-check-input" name="hasVisa" value="true" id="hasVisa" />
                                        <label className="form-check-label">Yes</label>
                                    </div>
                                    <div role="group" aria-labelledby="has-visa-group" className='form-check text-start'>
                                        <Field type="radio" className="form-check-input" name="hasVisa" value="false" id="hasVisa" />
                                        <label className="form-check-label">No</label>
                                    </div>

                                    {str2bool(values.hasVisa) && <fieldset className="form-group fw-bold">
                                        <MySelect label="Visa Type" name="degree">
                                            {visaTypes.map(e => (
                                                <option key={e} value={e} >{e}</option>
                                            )
                                            )}
                                        </MySelect>
                                    </fieldset>}


                                    {str2bool(values.hasVisa) && <div className="row g-2 text-start fw-bold">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Visa Number"
                                                        name="VisaNumber"
                                                        type="text"
                                                        placeholder="ie 2346"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Visa Expiry"
                                                        name="VisaExpiry"
                                                        type="date"
                                                        placeholder="Damas"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    } */}
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

export default CourseSelection;