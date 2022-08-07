import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import MySelect from '../MyFormikComponents/MySelect';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { faculties, str2bool} from './resources'
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

    const handleSubmit = (values) => {
        console.log('Values Course', values)
        props.next(values, true)
    }

    return (
        <div className="App ">
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-6 border border-5 p-3 mb-2 shadow-lg p-3">
                        <h1 className='fs-1 badge bg-primary text-wrap text-center'>Course Selection</h1>
                        <Formik
                            enableReinitialize={true}
                            initialValues={props.data}
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

                                    <div className="row g-2 text-start fw-bold">
                                        <div className="col-md text-start">
                                            <button type="button" onClick={() => props.prev(values)} className="btn btn-primary">Back</button>
                                        </div>
                                        <div className="col-md text-end">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
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