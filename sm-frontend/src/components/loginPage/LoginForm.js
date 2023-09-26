import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useState } from "react";


export default function LoginForm() {

  let [email, setEmail] = useState('');
  let [pass, setPass] = useState('');
  const [errorMsg, setErrorMsg] = useState({});
  const [loginData, setLoginData] = useState({email: '', pass: ''});


  const validation = (loginData) => {
    let error = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if(loginData.email === ""){
      error.email = "Enter your email";
    }
    else if(emailRegex.test(loginData.email) === false){
      error.email = "Incorrect email";
    }
    else{
      error.email = "";
    }

    if(loginData.pass === ""){
      error.pass = "Enter your password"
    }
    else if(passRegex.test(loginData.pass) === false){
      error.pass = "Password doesn't match the email";
    }
    else{
      error.pass = "";
    }

    return error;
  }

  const submitOnClick = (e) => {
    e.preventDefault();
    setLoginData(prev => ({...prev, email: email, pass: pass}));
    setErrorMsg(validation(loginData));
  }

  return (
    <div className="LoginFormArea">
      <h1>Login</h1>
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={e => setEmail(e.target.value)}/>
                {errorMsg.email && <Form.Text className="errorMessage">{errorMsg.email}</Form.Text>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={e => setPass(e.target.value)}/>
                {errorMsg.pass && <Form.Text className="errorMessage">{errorMsg.pass}</Form.Text>}
            </Form.Group>
        </Form>
        <Button variant="primary"  onClick={submitOnClick}>Login</Button>
        <Button variant="secondary"><Link to="/register">Create new account</Link></Button>
    </div>
  );
}
