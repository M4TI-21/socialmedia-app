export default function SecondValidation(registerData){
    let error = {};
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if(registerData.name === null && registerData.tag === null){
      error.name = "Enter your name";
      error.tag = "Enter your user tag";
    }
    else if(registerData.name === null && registerData.tag !== null){
      error.name = "Enter your name";
    }
    else if(registerData.tag === null && registerData.name !== null){
      error.name = "Enter your user tag";
    }
    else{
      error.tag = "";
      error.name = "";
    }

    //Password
    if(registerData.pass === null){
      error.pass = "Enter your password"
    }
    else if(passRegex.test(registerData.pass) === false){
      error.pass = "Your password must contain at least one capitalized letter and one number";
    }
    else{
      error.pass = "";
    }

    return error;
}
