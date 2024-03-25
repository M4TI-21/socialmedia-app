export default function FirstRegValidation(email, dob, setRegisterData){
    let error = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if(email === ""){
        error.email = "Enter your email";
    }
    else if(emailRegex.test(email) === false){
        error.email = "Incorrect email format";
    }
    else{
        error.email = "";
        setRegisterData(prev => ({...prev, email: email}));
    }

    if(dob === undefined){
        error.dob = "Enter you date of birth";
        
    }
    else{
        error.dob = "";
        setRegisterData(prev => ({...prev, dob: dob.slice(11)}));
    }

    return error;
}