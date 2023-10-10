import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import SecondValidation from "./RegisterValidationTwo";
import FirstValidation from './RegisterValidationOne';
import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import NavbarComp from "../../elements/Navbar"

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
            console.log("Wpisane dane: ", registerData);
            console.log("error");
        }
        else{
          console.log("Wpisane dane: ", registerData);
          axios.post('http://localhost:8080/register', {email, pass, dob, name, tag})
          .then(res => console.log(res))
          navigate("/");
          alert("User registered. Login Now!");
        }
    }

  return (
    <div className="d-flex flex-column align-items-center">
      <NavbarComp />
      <div className="pageContent">
        <div className="loginFormArea">
          <h1 className="title">Register new account</h1>
            <Form className="form">
              {active === "StepOne" && <RegisterStepOne setEmail = {setEmail} setDob = {setDob} errorMsg = {errorMsg} continueOnClick = {continueOnClick}/>}
              {active === "StepTwo" && <RegisterStepTwo setName = {setName} setTag = {setTag} setPass = {setPass} errorMsg = {errorMsg} submitOnClick = {submitOnClick} setActive = {setActive}/>}
            </Form>
        </div>
      </div>
    </div>
  );
}
