import { useLocation } from "react-router-dom";
import MainNavComp from "./elements/MainNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./mainPageStyle.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();

  async function populateMain(){
    const request = await axios.get("https://localhost:8080/main", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    });

    const data = request.json();
    console.log(data)
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

  return (
    <div className="mainPageContent d-flex flex-column align-items-center">
      <div className="topPage">
        <MainNavComp />
      </div>
      <h1>Witaj, {location.state.id}</h1>
    </div>
  );
}