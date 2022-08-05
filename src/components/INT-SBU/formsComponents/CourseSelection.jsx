import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import MySelect from '../MyFormikComponents/MySelect';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { faculties, visaTypes, medicalConditionValues, hearAboutUsValues, phoneRegExp, str2bool, countryList } from './resources'
import { useState } from 'react';

const CourseSelection = (props) => {

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [wishList, setWishList] = useState({});

    const addWish = (fac, dep) => {
        console.log('fac is', fac, 'dep is', dep);
        const temp = wishList;
        temp[fac] = dep;
        console.log('temp is', temp);
        setWishList(temp);
        console.log(wishList);
        forceUpdate();
    }

    useEffect(() => {

    }, [addWish, setWishList])

    const handleSubmit = (values) => {
        console.log(values.hasVisa);

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
                                faculity: 'Faculty of Electrical Engineering',
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
                                                faculties[values.faculity].map(e => (
                                                    <option key={e} value={e} >{e}</option>
                                                )
                                                )
                                            }
                                        </MySelect>
                                    </fieldset>

                                    <button type='button' onClick={() => addWish(values.faculity, values.department)} className="btn btn-primary">Add Wish</button>

                                    <fieldset className="form-group fw-bold">
                                        <div className='text-start'>
                                            {
                                                Object.entries(wishList).map(item => {
                                                    return (
                                                        <div key={item}>
                                                            <h4>{item}</h4>
                                                            <hr />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
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

export default CourseSelection;