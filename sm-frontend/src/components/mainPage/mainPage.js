import MainNavComp from "./elements/MainNavbar";
import AddNote from "./elements/AddNote";
import NoteType1 from "./elements/NoteType1";
import "./mainPageStyle.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Flex} from "@chakra-ui/react";

export default function MainPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState('');
  const [addNoteActive, setAddNoteActive] = useState("Inactive");

  const [notes, setNotes] = useState([]);

  const populateMainData = () => {
    axios.get("http://localhost:8080/main/user", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res) => {
      setUserData(res.data);
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

  const fetchAllNotes = async () => {
    axios.get("http://localhost:8080/main/usernotes", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res) => {
      setNotes(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchAllNotes();
  }, [])

  const addNote = async () => {
    axios.post('http://localhost:8080/main/createnote', {email})
    .then((res) => {
      if(res.data.status === "Note created successfully"){
        console.log("Note created");
        fetchAllNotes();
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const addNoteOnClick = (e) => {
    e.preventDefault();
    setAddNoteActive("Inactive");
    addNote(); 
  }

  return (
    <div className="mainPage d-flex flex-column align-items-center">
      <div className="topPage">
        <MainNavComp logOut={logOut} addNoteActiveOnClick={addNoteActiveOnClick} name={userData.name}/>
      </div>
      {addNoteActive === "Active" && <AddNote addNoteActiveOnClick={addNoteActiveOnClick} addNoteOnClick={addNoteOnClick}/>}
      <Flex w="100%" minH="80vh" flexDirection="row" flexWrap="wrap" p="5%">
          {notes.map(e => (
            <NoteType1 key={e.note_id} note_id={e.note_id} title={e.title} content={e.content} notes={notes}/>
          ))}
      </Flex>
    </div>
  );
}