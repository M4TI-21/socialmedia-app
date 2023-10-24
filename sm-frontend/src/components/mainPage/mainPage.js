import { useLocation } from "react-router-dom";
import MainNavComp from "./elements/MainNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./mainPageStyle.css";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();

  async function populateMain(){
    const data = await fetch("https://localhost:8080/main", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
      const user = jwt.decode(token);
      if(!user){
        localStorage.removeItem("token");
        navigate("/welcome");
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
