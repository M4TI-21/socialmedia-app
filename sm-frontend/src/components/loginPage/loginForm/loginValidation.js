export default function LoginValidation(loginEmail, loginPass){
    let error = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    var pass = loginPass;
    var email = loginEmail;

    if(email === ""){
      error.email = "*Enter your email";
    }
    else if(emailRegex.test(email) === false){
      error.email = "*Incorrect email";
    }
    else{
      error.email = "";
    }

    if(pass === ""){
      error.pass = "*Enter your password"
    }
    else if(passRegex.test(pass) === false){
      error.pass = "*Password doesn't match the email";
    }
    else{
      error.pass = "";
    }

    return error;
  }