import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import './loginFormStyle.css';
import NavbarComp from "../../elements/Navbar";

export default function LoginForm() {

  const navigate = useNavigate();
  let [loginEmail, setEmail] = useState('');
  let [loginPass, setPass] = useState('');
  const [errorMsg, setErrorMsg] = useState({});
  const [loginData, setLoginData] = useState({loginEmail: null, loginPass: null});


  const validation = (loginData) => {
    let error = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    var pass = loginData.loginPass;
    var email = loginData.loginEmail;

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

  const submitOnClick = (e) => {
    e.preventDefault();
    setLoginData(prev => ({...prev, loginEmail: loginEmail, loginPass: loginPass}));
    const error = validation(loginData);
    setErrorMsg(error);

    if(error.email !== "" || error.pass !== ""){
      console.log("Error");
    }
    else{
      axios.post('http://localhost:8080/login', {loginEmail, loginPass})
          .then(res => {console.log(res);

          if(res.data.status === "There is no user record with that email"){
            console.log("There is no user record with that email");
          }
          else if(res.data.status === "Incorrect password"){
            console.log("Password doesn't match the email");
          }
          else if(res.data.status === "User logged"){
            console.log("User logged");
            navigate("/main", {state: {id: loginEmail}})
          }
          })
          .catch(err => console.log(err))     
    }
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <NavbarComp />
      <div className="pageContent">
        <div className="loginFormArea">
          <h1 className="title">Login to your account</h1>
            <Form className="form">
                <Form.Group className="emailGroup">
                    <Form.Control className="input email" placeholder="Email" type="text" onChange={e => setEmail(e.target.value)}/>
                    {errorMsg.email && <Form.Text className="errorMessage">{errorMsg.email}</Form.Text>}
                </Form.Group>
                <Form.Group className="passGroup">
                    <Form.Control className="input pass" placeholder="Password" type="password" onChange={e => setPass(e.target.value)}/>
                    {errorMsg.pass && <Form.Text className="errorMessage">{errorMsg.pass}</Form.Text>}
                </Form.Group>
            </Form>
            <Button className="submitBtn d-flex align-items-center justify-content-center" onClick={submitOnClick}>Sign in</Button>
        </div>
        <div className="registerArea">
          <p className="regText1 d-flex align-items-center justify-content-center">Don't have an account?</p>
          <p className="regText2 d-flex align-items-center justify-content-center">Sign up now!</p>
          <Button as={Link} className="registerBtn d-flex align-items-center justify-content-center" to="/register">Create new account</Button>
        </div>
      </div>
    </div>
  );
}
