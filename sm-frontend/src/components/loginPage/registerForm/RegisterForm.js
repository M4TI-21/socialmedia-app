import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SecondValidation from "./RegisterValidationTwo";
import FirstValidation from './RegisterValidationOne';
import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import NavbarComp from "../../elements/Navbar";
import './registerFormStyle.css';

export default function RegisterForm() {
    const navigate = useNavigate();
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
            console.log("error");
        }
        else{
          axios.post('http://localhost:8080/register', {email, pass, dob, name, tag})
          .then(res => {console.log(res)
            if(res.data === "Created account"){
              navigate("/login");
              alert("User registered. Login Now!");
            }
            else if(res.data === "Account already existing"){
              console.log("Account already existing");
            }
          })  
        }
    }
    
  return (
    <div className="d-flex flex-column align-items-center">
      <NavbarComp />
      <div className="pageContent">
        <div className="regFormArea">
          <h1 className="title">Register new account</h1>
            {active === "StepOne" && <RegisterStepOne setEmail = {setEmail} setDob = {setDob} errorMsg = {errorMsg} continueOnClick = {continueOnClick}/>}
            {active === "StepTwo" && <RegisterStepTwo setName = {setName} setTag = {setTag} setPass = {setPass} errorMsg = {errorMsg} submitOnClick = {submitOnClick} setActive = {setActive}/>}
        </div>
        <div className="rightArea">
          <p className="regText1 d-flex align-items-center justify-content-center">Why join us?</p>
          <ul className="regText2 d-flex flex-column align-items-start">
            <li>IDK</li>
            <li>IDK</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
