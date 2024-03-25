import { Text, Flex, Box, UnorderedList, ListItem, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import NavbarComp from "../../elements/Navbar";
import FirstRegValidation from "./validationFiles/FirstRegValidation";
import SecondRegValidation from "./validationFiles/SecondRegValidation";
import './registerFormStyle.css';

export default function RegisterForm(props) {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState();
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [pass, setPass] = useState("");
  const [active, setActive] = useState("StepOne");
  const [errorMsg, setErrorMsg] = useState({});
  const [registerData, setRegisterData] = useState({email: null, dob: undefined, name: null, tag: null, pass: null});
  const [showAlert, setShowAlert] = useState(false)

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

  const returnOnClick = (e) => {
    e.preventDefault();

    setEmail(null);
    setDob(undefined);
    setName(null);
    setTag(null);
    setPass(null);
    setActive("StepOne");
  }

  const submitOnClick = (e) => {
      e.preventDefault();

      const error = SecondRegValidation(name, tag, pass, setRegisterData);
      setErrorMsg(error);

      if(error.name !== "" || error.tag !== "" || error.pass !== ""){
        console.log("no errors");
      }
      else{
        const axiosRegisterPost = async () => {
            await axios.post('http://localhost:8080/register', 
            {
              email, 
              pass, 
              dob, 
              name, 
              tag
            })
            .then((res) => {
              console.log(registerData)
              setShowAlert(true)
            })
            .catch((err) => {
              console.log(err);
            })
        }
        axiosRegisterPost()
      } 
  }
    
  return (
    <Flex flexDir="column" alignItems="center" pb="4" h="100vh" w="100vw">
      <NavbarComp />
      <Box className="pageContent">

        <Flex w="45vw" h="inherit" flexDir="column" alignItems="center" justifyContent="space-around" mt="2">
          <Text fontSize="5xl" fontWeight="bold" mt="6">Register new account</Text>
            {active === "StepOne" && <RegisterStepOne continueOnClick = {continueOnClick} errorMsg = {errorMsg} setEmail = {setEmail} setDob = {setDob}/>}

            {active === "StepTwo" && <RegisterStepTwo submitOnClick = {submitOnClick} errorMsg = {errorMsg} 
            setPass = {setPass} setName = {setName} setTag = {setTag} returnOnClick={returnOnClick}/>}
        </Flex>
        
        <Flex w="25vw" h="inherit" flexDir="column" alignItems="center" justifyContent="center" className="rightArea">
          <Text fontSize="4xl" color="#EEE" fontWeight="bold">Why join us?</Text>
          <UnorderedList>
            <ListItem fontSize="2xl" color="#EEE" textAlign="center">Easy access to your every note</ListItem>
            <ListItem fontSize="2xl" color="#EEE" textAlign="center">Free for everyone, everywhere</ListItem>
            <ListItem fontSize="2xl" color="#EEE" textAlign="center">Simple and convenient design</ListItem>
          </UnorderedList>
        </Flex>

        {showAlert === true &&
        <Alert status="success" position="fixed" w="30vw" minH="7vh" right="0" bottom="0">
          <AlertIcon />
          <Flex justifyContent="center" alignItems="center" flexDir="column" ml="2vw" w="100%">
            <AlertTitle textAlign="center" fontSize="small">Account successfully created! Welcome to Sigma Notes.</AlertTitle>
            <AlertDescription textAlign="center" as={Link} to="/login" textDecor="underline" _hover={{ fontWeight: "semibold"}}>Login to your account</AlertDescription>
          </Flex>
        </Alert>
        }
      </Box>
    </Flex>
  );
}
