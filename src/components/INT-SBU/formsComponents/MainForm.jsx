import React, { useState } from "react";
import Apply from '../Apply';
import ContactDetails from './ContactDetails';
import PassAndVisa from './PassAndVisa';
import CourseSelection from './CourseSelection';

function Form() {
    const [page, setPage] = useState(0);
    const FormTitles = ["Apply", "Contact Details", "Passport", "Course Selection"];

    const PageDisplay = () => {
        if (page === 0) {
            return (<Apply />);
        } else if (page === 1) {
            return <ContactDetails />;
        } else if (page === 2) {
            return <PassAndVisa />;
        } else {
            return <CourseSelection />;
        }
    };

    return (
        <div className="formPage">
            <div className="form">
                <div className="form-container">
                    <div className="body">
                        {PageDisplay()}
                    </div>
                    <div className="footer">
                        <button
                            disabled={page == 0}
                            onClick={() => {
                                setPage((currPage) => currPage - 1);
                            }}
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => {
                                if (page === FormTitles.length - 1) {
                                    alert("FORM SUBMITTED");
                                } else {
                                    setPage((currPage) => currPage + 1);
                                }
                            }}
                        >
                            {page === FormTitles.length - 1 ? "Submit" : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;