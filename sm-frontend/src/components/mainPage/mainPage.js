import MainNavComp from "./elements/MainNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./mainPageStyle.css";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
  const navigate = useNavigate();
  //const [post, setPost] = useState('');
  const [name, setName] = useState('');

  const populateMain = () => {
    axios.get("http://localhost:8080/main", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res) => {
      setName(res.data.name)
    })
    .catch((err) => {
      console.log(err)
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
        populateMain();
      }
    }
  })

  const logOut = () => {
    console.log("logout")
    localStorage.removeItem("token");
  }

  return (
    <div className="mainPageContent d-flex flex-column align-items-center">
      <div className="topPage">
        <MainNavComp logOut = {logOut}/>
      </div>
      <div className="mainPageContent d-flex flex-column align-items-center">
        <h1>Hello, {name}</h1>
        <p>Your notes will appear here.</p>
      </div>
    </div>
  );
}