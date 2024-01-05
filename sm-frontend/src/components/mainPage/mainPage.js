import MainNavComp from "./elements/MainNavbar";
import AddNote from "./elements/AddNote";
import NoteType1 from "./elements/noteTypes/NoteType1";
import "./mainPageStyle.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Flex, Text, Button, Input} from "@chakra-ui/react";

export default function MainPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  //const [tag, setTag] = useState('');
  //const [dateOfBirth, setDateOfBirth] = useState('');
  const [addNoteActive, setAddNoteActive] = useState("Inactive");
  const [notes, setNotes] = useState([]);
  const [sort, setSort] = useState("date-desc");
  const [search, setSearch] = useState("");

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

  const sortNotesBtn = () => {
    if(sort === "date-desc"){
      setSort("date-asc");
    }
    else if(sort === "date-asc"){
      setSort("fav");
    }
    else if(sort === "fav"){
      setSort("date-desc");
    }
  }

  const fetchAllNotes = async () => {
    axios.get("http://localhost:8080/main/notes", {
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

  const fetchSearchedNotes = async () => {
    axios.post("http://localhost:8080/main/searchnotes", {search,
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

  useEffect(() =>{
    if(search == ""){
      fetchAllNotes();
    }
    else{
      fetchSearchedNotes();
    }
  }, [search])


  return (
    <div className="mainPage d-flex flex-column align-items-center">
      <div className="topPage">
        <MainNavComp logOut={logOut} addNoteActiveOnClick={addNoteActiveOnClick} name={name}/>
      </div>
      <Flex flexDirection="row" alignItems="baseline" justifyContent="space-around" w="100%" mb="3%">
      <Input onChange={(e) => {setSearch(e.target.value); console.log(e.target.value)}} type="text" ml="10%" mr="10%" placeholder="Search your notes..." border="1px solid #bbb" borderRadius="20px" w="50%"/>
        {sort === "date-desc" && <Button onClick={() => sortNotesBtn()} w="20%">Sorting: by date descending</Button>}
        {sort === "date-asc" && <Button onClick={() => sortNotesBtn()} w="20%">Sorting: by date ascending</Button>}
        {sort === "fav" && <Button onClick={() => sortNotesBtn()} w="20%">Sorting: by favorites</Button>}

      </Flex>
      {addNoteActive === "Active" && <AddNote addNoteActiveOnClick={addNoteActiveOnClick} email={email} fetchAllNotes={fetchAllNotes} setAddNoteActive={setAddNoteActive}/>}
      <Flex maxW="100%" minH="80vh" flexDirection="row" flexWrap="wrap" pl="3%" pr="3%">
          {notes.map(e => (
            <NoteType1 key={e.note_id} note_id={e.note_id} title={e.title} content={e.content} notes={notes} fetchAllNotes={fetchAllNotes}/>
          ))}
      </Flex>
    </div>
  );
}