import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import SecondValidation from "./registerForm/RegisterValidationTwo";
import FirstValidation from './registerForm/RegisterValidationOne';
import RegisterStepOne from "./registerForm/RegisterStepOne";
import RegisterStepTwo from "./registerForm/RegisterStepTwo";
export default function RegisterForm() {
    //const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState();
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [pass, setPass] = useState('');
    const [active, setActive] = useState('StepOne');
    const [errorMsg, setErrorMsg] = useState({});
    const [registerData, setRegisterData] = useState({email: null, dob: undefined, name: null, tag: null, pass: null});
  
    const continueOnClick = (e) => {
      e.preventDefault();
      setRegisterData(prev => ({...prev, email: email, dob: dob, name: null, tag: null, pass: null}));
      
      const error = FirstValidation(registerData);
      setErrorMsg(error);
      if(error.email === "" && error.dob === ""){
        setActive("StepTwo");
      }
    }

    const submitOnClick = (e) => {
        e.preventDefault();
        setRegisterData(prev => ({...prev, email: email, dob: dob, name: name, tag: tag, pass: pass}));

        const error = SecondValidation(registerData);
        setErrorMsg(error);
        if(error.name !== "" && error.tag !== "" && error.pass !== "" && error.email !== "" && error.dob !== ""){
            console.log(registerData);
            console.log("error");
        }
        else{
          console.log(registerData);
          
          axios.post('http://localhost:8080/register', {email, pass, dob, name, tag})
          .then(res => console.log(res))
          .catch(err => console.log(err))
          alert("User registered. Login Now!")
        }
    }

  return (
    <div className="RegisterFormArea">
      <h1>Register</h1>
        {active === "StepOne" && <RegisterStepOne setEmail = {setEmail} setDob = {setDob} errorMsg = {errorMsg} continueOnClick = {continueOnClick}/>}

        {active === "StepTwo" && <RegisterStepTwo setName = {setName} setTag = {setTag} setPass = {setPass} errorMsg = {errorMsg} submitOnClick = {submitOnClick} setActive = {setActive}/>}
    </div>
  );
}
