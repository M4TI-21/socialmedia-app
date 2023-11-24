import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import NavbarComp from "../../elements/Navbar";
import FirstRegValidation from "./validationFiles/FirstRegValidation";
import SecondRegValidation from "./validationFiles/SecondRegValidation";
import './registerFormStyle.css';

export default function RegisterForm(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState();
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [pass, setPass] = useState("");
  const [active, setActive] = useState("StepOne");
  const [errorMsg, setErrorMsg] = useState({});
  const [registerData, setRegisterData] = useState({email: null, dob: undefined, name: null, tag: null, pass: null});

  const continueOnClick = (e) => {
    e.preventDefault();

    const error = FirstRegValidation(email, dob, setRegisterData);
    setErrorMsg(error);

    if(error.email !== "" || error.dob !== ""){
        console.log("Validation error");
    }
    else{
        setActive("StepTwo");
    }
  }

  const submitOnClick = (e) => {
      e.preventDefault();

      const error = SecondRegValidation(name, tag, pass, setRegisterData);
      setErrorMsg(error);

      if(error.name !== "" || error.tag !== "" || error.pass !== ""){
        console.log("Validation error 2");
      }
      else{
        const axiosRegisterPost = async () => {
          try{
            const response = await axios.post('http://localhost:8080/register', {email, pass, dob, name, tag});
            console.log(response);
      
            if(response.data === "Created account"){
              navigate("/login");
              alert("User registered. Login Now!");
            }
            else if(response.data === "Account already existing"){
              console.log("Account already existing");
            }
          }
          catch(error){
            console.log(error);
          }
        }
        axiosRegisterPost()
      }
  }
    
  return (
    <div className="d-flex flex-column align-items-center pb-4">
      <NavbarComp />
      <div className="pageContent">
        <div className="regFormArea mt-2">
          <h1 className="title">Register new account</h1>
          <h4>Enter your data</h4>
            {active === "StepOne" && <RegisterStepOne continueOnClick = {continueOnClick} errorMsg = {errorMsg} 
            setEmail = {setEmail} setDob = {setDob}  />}
            {active === "StepTwo" && <RegisterStepTwo submitOnClick = {submitOnClick} errorMsg = {errorMsg} 
            setPass = {setPass} setName = {setName} setTag = {setTag} />}
        </div>
        <div className="rightArea">
          <p className="regText1 d-flex align-items-center justify-content-center">Why join us?</p>
          <ul className="d-flex flex-column align-items-start m-4">
            <li className="regText2">Easy access to your every note</li>
            <li className="regText2">Free for everyone, everywhere</li>
            <li className="regText2">Simple and convenient design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
