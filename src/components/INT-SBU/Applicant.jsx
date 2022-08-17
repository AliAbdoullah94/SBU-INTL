import { useParams } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import ApplicantDataService from "../../api/ApplicantDataService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Applicant = () => {
    const navigete = useNavigate();
    const { id } = useParams();
    const [applicant, setApplicant] = useState(
        {
            id: id,
            firstName: '',
            lastName: '',
            email: '',
            birth: moment(new Date()).format('YYYY-MM-DD'),
            gender: '',
            nationality: '',
            degree: '',
            applyFor: '',
            job: '',
            aboutApplicant: '',
            //Conact Details
            address: '',
            city: '',
            mobile: '',
            phone: '',
            hasMedicalCondition: false,
            medicalConditions: ["1"],
            hearAboutUsWays: ["1"],
            //Pass And Visa
            passCountry: '',
            passNumber: '',
            passExpiry: undefined,
            passDoc: undefined,
            visaNumber: '',
            visaExpiry: undefined,
            hasVisa: false,
            //Course Selection
            wishList: [],
        });

    useEffect(() => {
        console.log("Applicant: ", applicant)
        ApplicantDataService.retrieveApplicant(id)
            .then(response => {
                setApplicant({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    birth: moment(response.data.birth).format('YYYY-MM-DD'),
                    gender: response.data.gender,
                    nationality: response.data.nationality,
                    degree: response.data.degree,
                    applyFor: response.data.applyFor,
                    job: response.data.job,
                    aboutApplicant: response.data.aboutApplicant,
                    //Conact Details
                    address: response.data.address,
                    city: response.data.city,
                    mobile: response.data.mobile,
                    phone: response.data.phone,
                    hasMedicalCondition: response.data.hasMedicalCondition,
                    medicalConditions: response.data.medicalConditions,
                    hearAboutUsWays: response.data.hearAboutUsWays,
                    //Pass And Visa
                    passCountry: response.data.passCountry,
                    passNumber: response.data.passNumber,
                    passExpiry: response.data.passExpiry,
                    passDoc: response.data.passDoc,
                    visaType: response.data.visaType,
                    visaNumber: response.data.visaNumber,
                    visaExpiry: response.data.visaExpiry,
                    hasVisa: response.data.hasVisa,
                    //Course Selection
                    wishList: response.data.wishListStr,
                })
            }
            )
        console.log("Applicant: ", applicant)
    }, [])

    return (
        <div>
            <h1 className="display-6">{applicant.firstName + ' ' + applicant.lastName}</h1>
            <div className="d-flex flex-row">
                <div className="container p-2">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-10 border border-5 mb-2 shadow-lg p-2">
                            <h1 className='fs-1 badge bg-primary text-wrap text-center'>Personal Info</h1>
                            <div className="row g-2 text-start">
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>First Name</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.firstName}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Last Name:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.lastName}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2 text-start">
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Email:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.email}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Birth Date:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.birth}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2 text-start">
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Gender:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.gender}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Nationality:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.nationality}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2 text-start">
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Current Degree:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.degree}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Applied For:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.applyFor}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2 text-start">
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Job:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.job}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>About Applicant:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.aboutApplicant}</div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="container p-2">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-10 border border-5 mb-2 shadow-lg p-2">
                            <h1 className='fs-1 badge bg-primary text-wrap text-center'>Contact Details</h1>
                            <div className="row g-2 text-start">
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Address</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.address}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>City:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.city}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2 text-start">
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Mobile:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.mobile}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Phone:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.phone}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2 text-start">
                                {applicant.hasMedicalCondition &&
                                    <div className="col-md">
                                        <div className="form-floating fw-bold">
                                            <div>Medical Conditions:</div>
                                        </div>
                                        <div className="form-floating">
                                            <div>{applicant.medicalConditions.map(e => (
                                                <label key={e}>{e}, </label>
                                            ))}</div>
                                        </div>
                                    </div>
                                }
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>heared about us from this: </div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.hearAboutUsWays.map(e => (
                                            <div key={e}>{e}</div>
                                        ))}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row">
                <div className="container p-2">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-10 border border-5 mb-2 shadow-lg p-2">
                            <h1 className='fs-1 badge bg-primary text-wrap text-center'>Passport And Visa Details</h1>



                            <div className="row g-2 text-start">
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Country Of Passport:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.passCountry}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Passport Number:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.passNumber}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <div className="form-floating fw-bold">
                                            <div>Passport Expiry:</div>
                                        </div>
                                        <div className="form-floating">
                                            <div>{moment(applicant.passExpiry).format('YYYY-MM-DD')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="form-group fw-bold">
                            <label>Passport Image</label>
                        </div> */}

                            <div id="has-visa-group" className="form-check fw-bold text-start">{applicant.hasVisa ? "" : "applicant doesn't has visa for Iran"}</div>

                            {applicant.hasVisa && <div className="row g-2 text-start">
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Visa Type:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.visaType}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating fw-bold">
                                        <div>Visa Number:</div>
                                    </div>
                                    <div className="form-floating">
                                        <div>{applicant.visaNumber}</div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <div className="form-floating fw-bold">
                                            <div>Visa Expiry Date:</div>
                                        </div>
                                        <div className="form-floating">
                                            <div>{moment(applicant.visaExpiry).format('YYYY-MM-DD')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }

                        </div>
                    </div>
                </div>
                <div className="container p-2">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-10 border border-5 mb-2 shadow-lg p-2">
                            <h1 className='fs-1 badge bg-primary text-wrap text-center'>Wish List Courses:</h1>
                            <div className="row g-2 text-start">
                                <div className="col-md">
                                    {applicant.wishList.map(e => (
                                        <div className="form-floating fw-bold" key={e}>
                                            <div>{e}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Applicant;