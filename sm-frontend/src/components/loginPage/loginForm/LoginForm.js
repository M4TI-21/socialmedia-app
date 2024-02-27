import { FormControl, Button, FormLabel, FormHelperText, Input, Text, Flex, Box } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useState } from "react";
import './loginFormStyle.css';
import NavbarComp from "../../elements/Navbar";

export default function LoginForm() {

  const navigate = useNavigate();
  let [loginEmail, setEmail] = useState('');
  let [loginPass, setPass] = useState('');
  const [errorMsg, setErrorMsg] = useState({});
  const [loginData, setLoginData] = useState({loginEmail: null, loginPass: null});

  const validation = () => {
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

  const submitOnClick = (e) => {
    e.preventDefault();
    setLoginData(prev => ({...prev, loginEmail: loginEmail, loginPass: loginPass}));
    const error = validation(loginData);
    setErrorMsg(error);

    if(error.email !== "" || error.pass !== ""){
      console.log("Error");
    }
    else{
      const axiosLoginPost = async () => {
        try{
            const response = await axios.post('http://localhost:8080/login', {loginEmail, loginPass});
            console.log(response);

            if(response.data.status === "There is no user record with that email"){
              console.log("There is no user record with that email");
            }
            else if(response.data.status === "Incorrect password"){
              console.log("Password doesn't match the email");
            }
            else if(response.data.status === "User logged"){
              localStorage.setItem("token", response.data.user)
              console.log("User logged");
              navigate("/main")
            }
        }
        catch(error){
          console.log(error);
        }
      }
      axiosLoginPost(); 
    }
  }
  return (
    <Flex flexDir="column" alignItems="center" pb="4">
      <NavbarComp />
      <Box className="pageContent">
        <Flex w="45vw" h="inherit" flexDir="column" alignItems="center" justifyContent="space-around">
          <Text fontSize="5xl" fontWeight="bold" textAlign="center">Login to your account</Text>
            <FormControl ml="20vw">
                <FormLabel fontSize="2xl">Email:</FormLabel>
                <Input placeholder="example@mail.com" type="text" w="25vw" h="5vh" fontSize="lg" border="1px" borderColor="#888"
                onChange={e => setEmail(e.target.value)}/>
                {errorMsg.email && <FormHelperText color="red" fontSize="md">{errorMsg.email}</FormHelperText>}
            </FormControl>

            <FormControl ml="20vw">
                <FormLabel fontSize="2xl">Password:</FormLabel>
                <Input placeholder="Password123" type="password" w="25vw" h="5vh" fontSize="lg" border="1px" borderColor="#888" 
                onChange={e => setPass(e.target.value)}/>
                {errorMsg.pass && <FormHelperText color="red" fontSize="md">{errorMsg.pass}</FormHelperText>}
            </FormControl>

            <Button size="lg" w="10vw"colorScheme="blue" onClick={submitOnClick}>Sign in</Button>
        </Flex>

        <Flex className="registerArea" flexDir="column" alignItems="center" justifyContent="center">
          <Text fontSize="2xl" fontWeight="bold" color="#EEE" textAlign="center">Don't have an account?</Text>
          <Text fontSize="5xl" fontWeight="bold" color="#EEE" textAlign="center">Sign up now!</Text>
          <Button size="lg" w="10vw" colorScheme="blue" as={Link} to="/register" textAlign="center">Create new account</Button>
        </Flex>
      </Box>
    </Flex>
  );
}
