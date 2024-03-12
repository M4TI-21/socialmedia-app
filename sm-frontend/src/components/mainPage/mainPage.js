import MainNavComp from "./elements/MainNavbar";
import TodoPage from "./TodoPage";
import ProfilePage from "./ProfilePage";
import NotePage from "./NotePage";
import "./mainPageStyle.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

export default function MainPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [tag, setTag] = useState('');
  const [activePage, setActivePage] = useState("note");

  const populateMainData = () => {
    axios.get("http://localhost:8080/main/user", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res) => {
      setEmail(res.data.email);
      setTag(res.data.tag);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      const user = jwt_decode(token);
      if(!user){
        localStorage.removeItem("token");
        navigate("/");
      }
      else{
        populateMainData();
      }
    }
  })

  const logOut = () => {
    console.log("logout")
    localStorage.removeItem("token");
  }

  return (
    <Flex flexDir="column" alignItems="center">
      <Box w="100%" h="20vh" bg="FFF">
        <MainNavComp logOut={logOut} activePage={activePage} setActivePage={setActivePage}/>
      </Box>
      {activePage === "note" &&
        <>
          <NotePage email={email} tag={tag}/>
        </>
      }
      {activePage === "todo" &&
        <>
          <TodoPage email={email}/>
        </>
      }
      {activePage === "profile" &&
        <>
          <ProfilePage email={email} tag={tag}/>
        </>
      }
    </Flex>
  );
}