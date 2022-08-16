
const Form = () => {
    const [data, setData] = useState({
        //PersonalInfo
        nationality: "",
        degree: "",
        highSchoolDoc: undefined,
        bachelorDoc: undefined,
        MasterDoc: undefined,
        applyFor: "",
        birth: undefined,
        gender: "",
        
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
        faculty: 'Faculty of Electrical Engineering',
        department: faculties['Faculty of Electrical Engineering'][0],
        PassExpiry: moment(new Date).format('YYYY-MM-DD'),
    });

}

export default Form;