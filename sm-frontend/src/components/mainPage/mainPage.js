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

  const [notes, setNotes]= useState([{noteID: null, title: null, content: null, creationDate: null, updateDate: null}]);
  const [userNotes, setUserNotes] = useState([]);

  const populateMainData = () => {
    axios.get("http://localhost:8080/main/user", {
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

  const addNoteOnClick = (e) => {
    e.preventDefault();
    console.log("Note added");
    setAddNoteActive("Inactive");

    const showNote =  async () => {
      await axios.get("http://localhost:8080/main/notes", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then((res) => {
        setNotes([...notes, {
          noteID: res.data.noteID, 
          title: res.data.title, 
          content: res.data.content, 
          creationDate: res.data.creationDate, 
          updateDate: res.data.updateDate
        }]);
        
        console.log(res.data);
        let noteList = [];
        notes.forEach(e => {
          noteList.push(
              <li className="trip" key={e.noteID}>
                <p>Tu bedzie notatka</p>
              </li>
          )
        })
        setUserNotes([...noteList]);
        setNotes('');
      })
      .catch((err) => {
        console.log(err);
      })
    }

    const addNote = async () => {
      try{
          const response = await axios.post('http://localhost:8080/main', {email});
          console.log(response);
          if(response.data.status === "Note created successfully"){
            showNote();
          }
      }
      catch(error){
        console.log(error);
      }
    }
    addNote(); 
  }


  return (
    <div className="mainPage d-flex flex-column align-items-center">
      <div className="topPage">
        <MainNavComp logOut = {logOut} addNoteActiveOnClick={addNoteActiveOnClick} name={name}/>
      </div>
      {addNoteActive === "Active" && <AddNote addNoteActiveOnClick={addNoteActiveOnClick} addNoteOnClick={addNoteOnClick}/>}
      <div className="mainPageContent d-flex flex-column align-items-center">
        <ul>
          {userNotes}
        </ul>
      </div>
    </div>
  );
}