import React from 'react';
import { useFormik } from 'formik';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const Apply = () => {
    const degrees = ['Bachelor', 'Master', 'PHD'];

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            degree: degrees[0],
            age: 25,
            gender: 'male'
        },
        onSubmit: values => { submit(values) },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .label('Full Name')
                .required(),
            lastName: Yup.string()
                .label('Full Name')
                .required(),
            email: Yup.string()
                .email()
                .required(),
            degree: Yup.string()
                .oneOf(degrees, 'The degree you chose does not exist'),
            age: Yup.number()
                .min(15, 'You need to be older than 15 to register')
                .required()
        })
    });


    const submit = (values) => {
        console.log(values)
    }

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit} validate={formik.isValid}>
                <div className="container-lg">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                </div>
                <div className="container-fluid">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                </div>
                <div className="container-fluid">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div className="container">
                    <label htmlFor="degree">Apply for:</label>
                    <select id="degree" name="degree" type="select"
                        onChange={formik.handleChange}
                        value={formik.values.degree}
                    >
                        {degrees.map((degree, index) => (
                            <option value={degree} key={index}>{degree}</option>
                        ))}
                    </select>
                </div>
                <div className="container">
                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" type="Number"
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    ></input>
                </div>
                <div className="container">
                    <input type="radio" value="Male" name="gender" /> Male
                    <input type="radio" value="Female" name="gender" /> Female
                </div>
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Apply;