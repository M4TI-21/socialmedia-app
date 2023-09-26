export default function FirstValidation(registerData){
    let error = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if(registerData.email === null && registerData.dob === undefined){
        error.email = "Enter your email";
        error.dob = "Enter your date of birth";
      }
      else if(registerData.email !== null && registerData.dob === undefined){
        error.dob = "Enter your date of birth";
      }
      else if(registerData.email === null && registerData.dob !== undefined){
        error.email = "Enter your email";
      }
      else if(emailRegex.test(registerData.email) === false){
        error.email = "Incorrect email format";
      }
      else if(emailRegex.test(registerData.email) === true && registerData.dob !== undefined){
        error.dob = "";
        error.email = "";
      }

    return error;
}
