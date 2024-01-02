import MainNavComp from "./elements/MainNavbar";
import AddNote from "./elements/AddNote";
import NoteType1 from "./elements/noteTypes/NoteType1";
import "./mainPageStyle.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Flex} from "@chakra-ui/react";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //const [tag, setTag] = useState('');
  //const [dateOfBirth, setDateOfBirth] = useState('');
  const [addNoteActive, setAddNoteActive] = useState("Inactive");
  const [basicNotes, setBasicNotes] = useState([]);

  const populateMainData = () => {
    axios.get("http://localhost:8080/main/user", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      //setTag(res.data.tag);
      //setDateOfBirth(res.data.date_of_birth);
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
    axios.get("http://localhost:8080/main/basicnotes", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res) => {
      setBasicNotes(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchAllNotes();
  }, [])

  return (
    <div className="mainPage d-flex flex-column align-items-center">
      <div className="topPage">
        <MainNavComp logOut={logOut} addNoteActiveOnClick={addNoteActiveOnClick} name={name}/>
      </div>
      {addNoteActive === "Active" && <AddNote addNoteActiveOnClick={addNoteActiveOnClick} email={email}  fetchAllNotes={fetchAllNotes} setAddNoteActive={setAddNoteActive}/>}
      <Flex maxW="100%" minH="80vh" flexDirection="row" flexWrap="wrap" pl="3%" pr="3%">
          {basicNotes.map(e => (
            <NoteType1 key={e.note_id} note_id={e.note_id} title={e.title} content={e.content} basicNotes={basicNotes} fetchAllNotes={fetchAllNotes}/>
          ))}
      </Flex>
    </div>
  );
}