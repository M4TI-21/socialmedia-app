import MainNavComp from "./elements/MainNavbar";
import AddNote from "./elements/AddNote";
import NoteType1 from "./elements/NoteType1";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./mainPageStyle.css";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addNoteActive, setAddNoteActive] = useState("Inactive");
  const [notes, setNotes] = useState([]);

  const populateMainData = () => {
    axios.get("http://localhost:8080/main", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
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

  const addNoteActiveOnClick = (e) => {
    e.preventDefault();
    if(addNoteActive === "Active"){
      setAddNoteActive("Inactive");
    }
    else{
      setAddNoteActive("Active");
    }
  }

  const addNoteType1OnClick = (e) => {
    e.preventDefault();
    console.log("Add note type 1");
    setAddNoteActive("Inactive");

    const addNoteType1 = async () => {
      try{
          const response = await axios.post('http://localhost:8080/main', {email});
          console.log(response);
          if(response.data.status === "Note created successfully"){
            setNotes([...notes, {email, }])
          }
      }
      catch(error){
        console.log(error);
      }
    }
    addNoteType1(); 
  }

  return (
    <div className="mainPage d-flex flex-column align-items-center">
      <div className="topPage">
        <MainNavComp logOut = {logOut} addNoteActiveOnClick={addNoteActiveOnClick} />
      </div>
      {addNoteActive === "Active" && <AddNote addNoteActiveOnClick={addNoteActiveOnClick} addNoteType1OnClick={addNoteType1OnClick}/>}
      <div className="mainPageContent d-flex flex-column align-items-center">
        <h1>Hello, {name}</h1>
      </div>
    </div>
  );
}