import React, { useState } from "react";
import PersonalInfo from './PersonalInfo';
import ContactDetails from './ContactDetails';
import PassAndVisa from './PassAndVisa';
import CourseSelection from './CourseSelection';
import { medicalConditionValues, hearAboutUsValues, str2bool, degrees, degreesToApp, jobs, countryList, visaTypes, faculties } from './resources'
import moment from "moment";

function Form() {
    const [page, setPage] = useState(0);
    const FormTitles = ["PersonalInfo", "Contact Details", "Passport", "Course Selection"];
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState({
        //PersonalInfo
        nationality: countryList[215],
        degree: degrees[0],
        highSchoolDoc: undefined,
        bachelorDoc: undefined,
        MasterDoc: undefined,
        applyFor: degreesToApp[0],
        birth: moment(new Date).format('YYYY-MM-DD'),
        gender: 'male',
        acceptedTerms: true,
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
        VisaNumber: '123456',
        VisaExpiry: moment(new Date).format('YYYY-MM-DD'),
        hasVisa: str2bool("false"),
        //Course Selection
        faculity: 'Faculty of Electrical Engineering',
        department: faculties['Faculty of Electrical Engineering'][0],
        PassExpiry: moment(new Date).format('YYYY-MM-DD'),
        VisaNumber: '123456',
        VisaExpiry: moment(new Date).format('YYYY-MM-DD'),
        hasVisa: str2bool("false"),
    });

    const makeRequest = (formData) => {
        console.log("Form Submitted", formData)

        /* let email = props.email;
        console.log("values", values);

        let createdApplicant = {
            email: email,
            nationality: values.nationality,
            degree: values.degree,
            applyFor: values.applyFor,
            birth: values.birth,
            gender: values.gender,
            job: values.job,
            aboutApplicant: values.aboutApplicant
        }

        let createdForm = {
            applicant: createdApplicant,
            applyFor: values.applyFor,
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

export default Form;