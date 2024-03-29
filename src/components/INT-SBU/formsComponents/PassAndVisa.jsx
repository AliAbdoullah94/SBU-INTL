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
import { visaTypes, str2bool, countryList } from './resources'

const PassAndVisa = (props) => {

    const handleSubmit = (values) => {
        console.log('Values Pass And Visa', values)
        props.next(values)
    }

    return (
        <div className="App ">
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-6 border border-5 p-3 mb-2 shadow-lg p-3">
                        <h1 className='fs-1 badge bg-primary text-wrap text-center'>Passport And Visa Details</h1>
                        <Formik
                            enableReinitialize={true}
                            initialValues={props.data}
                            validationSchema={Yup.object({
                                passCountry: Yup.string()
                                    .required('Required'),
                                passNumber: Yup.string()
                                    .required('Required'),
                                passExpiry: Yup.date()
                                    .required('Required'),
                                visaNumber: Yup.string()
                                    .required('Required'),
                                visaExpiry: Yup.date()
                                    .required('Required'),
                                hasVisa: Yup.boolean()
                                    .required('Required'),
                            })
                                /* .shape({
                                    passDoc: Yup
                                        .mixed()
                                        .required("A file is required")
                                }) */
                            }
                            onSubmit={handleSubmit}
                        >
                            {({ values }) => (
                                <Form >

                                    <fieldset className="form-group fw-bold">
                                        <MySelect label="Country Of Passport" name="passCountry">
                                            {countryList.map(e => (
                                                <option key={e} value={e} >{e}</option>
                                            )
                                            )}
                                        </MySelect>
                                    </fieldset>

                                    <div className="row g-2 text-start fw-bold">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <fieldset className="form-group">
                                                    <MyTextInput
                                                        label="Passport Number"
                                                        name="passNumber"
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
                                                        label="Passport Expiry"
                                                        name="passExpiry"
                                                        type="date"
                                                        placeholder="Damas"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>

                                    <fieldset className="form-group fw-bold">
                                        <label>Upload Passport Image</label>
                                        <Field className="form-control" type="file" name="passDoc" />
                                    </fieldset>

                                    <div id="has-visa-group" className="form-check fw-bold text-start">Do you currently hold a valid visa of Iran?</div>
                                    <div role="group" aria-labelledby="has-visa-group" className='form-check text-start'>
                                        <Field type="radio" className="form-check-input" name="hasVisa" value="true" id="hasVisa" />
                                        <label className="form-check-label" htmlFor="hasVisa">Yes</label>
                                    </div>
                                    <div role="group" aria-labelledby="has-visa-group" className='form-check text-start'>
                                        <Field type="radio" className="form-check-input" name="hasVisa" value="false" id="hasVisa" />
                                        <label className="form-check-label" htmlFor="hasVisa">No</label>
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
                                                        name="visaNumber"
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
                                                        name="visaExpiry"
                                                        type="date"
                                                        placeholder="Damas"
                                                    />
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                    
                                    <div className="row g-2 text-start fw-bold">
                                        <div className="col-md text-start">
                                            <button type="button" onClick={() => props.prev(values)} className="btn btn-primary">Back</button>
                                        </div>
                                        <div className="col-md text-end">
                                            <button type="submit" className="btn btn-primary">Next</button>
                                        </div>
                                    </div>

                                </Form>
                            )}


                        </Formik>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PassAndVisa;