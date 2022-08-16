import React, { useState } from "react";
import PersonalInfo from './PersonalInfo';
import ContactDetails from './ContactDetails';
import PassAndVisa from './PassAndVisa';
import CourseSelection from './CourseSelection';
import { medicalConditionValues, hearAboutUsValues, str2bool, degrees, degreesToApp, jobs, countryList, visaTypes, faculties } from './resources'
import moment from "moment";
import ApplicantDataService from "../../../api/ApplicantDataService";
import FormDataService from "../../../api/FormDataService";
import { useNavigate } from "react-router-dom";

function MainForm(props) {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const FormTitles = ["PersonalInfo", "Contact Details", "Passport", "Course Selection"];
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState({
        //PersonalInfo
        birth: moment(new Date).format('YYYY-MM-DD'),
        nationality: countryList[215],
        degree: degrees[0],
        highSchoolDoc: undefined,
        bachelorDoc: undefined,
        MasterDoc: undefined,
        applyFor: degreesToApp[0],
        gender: 'male',
        job: jobs[1],
        aboutApplicant: 'epsom lorem',
        //Conact Details
        address: 'Velenjak - Bolvar',
        city: 'Damascus',
        mobile: '09901234567',
        phone: '0211234567',
        hasMedicalCondition: str2bool("false"),
        medicalConditions: undefined,
        hearAboutUsWays: hearAboutUsValues[0],
        //Pass And Visa
        passCountry: '',
        passNumber: '123456',
        passExpiry: moment(new Date).format('YYYY-MM-DD'),
        passDoc: undefined,
        hasVisa: str2bool("false"),
        visaType: visaTypes[0],
        visaNumber: '123456',
        visaExpiry: moment(new Date).format('YYYY-MM-DD'),
        //Course Selection
        faculty: 'Faculty of Electrical Engineering',
        department: faculties['Faculty of Electrical Engineering'][0],
        wishList: [],
    });

    const makeRequest = (formData) => {
        console.log("MainForm Submitted", formData)

        let email = props.email;
        console.log("formData", formData);

        let createdApplicant = {
            email: email,
            nationality: formData.nationality,
            degree: formData.degree,
            applyFor: formData.applyFor,
            birth: formData.birth,
            gender: formData.gender,
            job: formData.job,
            aboutApplicant: formData.aboutApplicant,
            //Contact Details
            address: formData.address,
            city: formData.city,
            mobile: formData.mobile,
            phone: formData.phone,
            hasMedicalCondition: formData.hasMedicalCondition,
            medicalConditions: formData.medicalConditions,
            hearAboutUsWays: formData.hearAboutUsWays,
            //
            passCountry: formData.passCountry,
            passNumber: formData.passNumber,
            passExpiry: formData.passExpiry,
            /* passDoc: undefined, */
            hasVisa: formData.hasVisa,
            visaType: formData.visaType,
            visaNumber: formData.visaNumber,
            visaExpiry: formData.visaExpirya,
            //
            wishList: formData.wishList,
        }

        let createdForm = {
            applicant: createdApplicant,
            applyFor: formData.applyFor,
            dateCreated: new Date(),
            aboutApplicant: formData.aboutApplicant
        }

        console.log("created", createdApplicant);

        ApplicantDataService.updateApplicant(email, createdApplicant)
            .then(() => {
                console.log(createdApplicant);
                /* FormDataService.createForm(createdForm) */
            }
            ).then(() => {
                console.log("MainForm Sent")
                /* navigate('/forms') */
            }
            )

    }

    const handleNextStep = (newData, final = false) => {
        console.log('handleNextStep, newData:', newData)
        setData(prev => ({ ...prev, ...newData }))

        if (final) {
            makeRequest(newData)
            return
        }

        setCurrentStep(prev => prev + 1)
    }

    const handlePrevStep = (newData) => {
        setData(prev => ({ ...prev, ...newData }))
        setCurrentStep(prev => prev - 1)
    }

    const steps = [
        <PersonalInfo next={handleNextStep} data={data} />,
        <ContactDetails next={handleNextStep} prev={handlePrevStep} data={data} />,
        <PassAndVisa next={handleNextStep} prev={handlePrevStep} data={data} />,
        <CourseSelection next={handleNextStep} prev={handlePrevStep} data={data} />]

    return (
        <div className="App">
            {steps[currentStep]}
        </div>
    );
}

export default MainForm;