import { useLocation } from "react-router-dom";
import MainNavComp from "./elements/MainNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./mainPageStyle.css";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState('');
  const [name, setName] = useState('');

  async function populateMain(){
    const request = await fetch("http://localhost:8080/main", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    
    const data = request.json();

    if (data.status === "Data fetched successfully"){
      setPost(data.post);
      setName(data.name);
    }
    else{
      console.log(data.error);
    }
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
      <div className="mainPageContent d-flex flex-column align-items-center">
        <h1>Elo, {name}</h1>
        <p>{post || "Your post will appear here."}</p>
      </div>
      
    </div>
  );
}