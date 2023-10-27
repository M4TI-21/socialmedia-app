export default function SecondRegValidation(name, tag, pass, setRegisterData){
    let error = {};
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const tagRegex = /^[a-zA-Z0-9_]+$/;

    if(name === ""){
      error.name = "*Enter your name";
    }
    else{
      error.name = "";
      setRegisterData(prev => ({...prev, name: name}));
    }

    if(tag === ""){
      error.tag = "*Enter your tag";
    }
    else if(tagRegex.test(tag) === false){
      error.tag = "*Create your tag using only letters, numbers or underscore"
    }
    else{
      error.tag = "";
      setRegisterData(prev => ({...prev, tag: tag}));
    }

    if(pass === ""){
      error.pass = "*Enter your password"
    }
    else if(passRegex.test(pass) === false){
      error.pass = "*Your password must contain at least one capitalized letter and one number";
    }
    else{
      error.pass = "";
      setRegisterData(prev => ({...prev, pass: pass}));
    }  

    return error;
}