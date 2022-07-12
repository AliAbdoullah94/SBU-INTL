import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../auth/AuthenticationService";
import useFetch from "./useFetch";


const Apply = () => {
    const [firstName, setFirstName] = useState('Ali');
    const [lastName, setLastName] = useState('Abdoullah');

    return (
        <form >
            <h3>Sign Up</h3>
            <div className="mb-3">
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required value={firstName}
                />
            </div>
            <div className="mb-3">
                <label>Last name</label>
                <input type="text" className="form-control" required placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/Login">Login?</a>
            </p>
        </form>
    );
};

export default Apply;