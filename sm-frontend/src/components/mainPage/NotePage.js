import Note from "./elements/Note";
import CreateNote from "./elements/CreateNote";
import "./mainPageStyle.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {Flex, Button, Input } from "@chakra-ui/react";
import { BiPlusCircle } from "react-icons/bi";

export default function NotePage(props) {
  const [addNoteActive, setAddNoteActive] = useState("Inactive");
  const [notes, setNotes] = useState([]);
  // const [sort, setSort] = useState("date-desc");
  const [search, setSearch] = useState("");

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
    axios.get("http://localhost:8080/main/notes/fetch_date_desc", {
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
    axios.post("http://localhost:8080/main/searchnotes", {
      search,
      headers: {"x-access-token": localStorage.getItem("token")}
    })
    .then((res) => {
      setNotes(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() =>{
    if(search === ""){
      fetchAllNotes();
    }
    else{
      fetchSearchedNotes();
    }
  }, [search])

  return (
    <>
    <Flex flexDirection="row" alignItems="baseline" justifyContent="space-around" w="100%" mb="3%">
        <Input onChange={(e) => {setSearch(e.target.value)}} type="text" placeholder="Search your notes..." border="1px solid #bbb" borderRadius="20px" minW="50vw" maxW="55vw"/>
        <Button size="md" leftIcon={<BiPlusCircle />} colorScheme="green" onClick={addNoteActiveOnClick} minW="8vw">ADD NOTE</Button>
        {/* {sort === "date-desc" && <Button onClick={() => sortNotesBtn()} w="16%">Sorting: by date descending</Button>}
        {sort === "date-asc" && <Button onClick={() => sortNotesBtn()} w="16%">Sorting: by date ascending</Button>}
        {sort === "fav" && <Button onClick={() => sortNotesBtn()} w="16%">Sorting: by favorites</Button>} */}

    </Flex>
    {addNoteActive === "Active" && <CreateNote addNoteActiveOnClick={addNoteActiveOnClick} email={props.email} fetchAllNotes={fetchAllNotes} setAddNoteActive={setAddNoteActive}/>}

    <Flex maxW="100%" minH="40vh" flexDirection="row" justifyContent="center" flexWrap="wrap" pl="3%" pr="3%">
        {notes.map(e => (
        <Note key={e.note_id} note_id={e.note_id} tag={props.tag} title={e.title} creationDate = {e.creation_date} updateDate={e.update_date} content={e.content} email={props.email} notes={notes} fetchAllNotes={fetchAllNotes}/>
        ))}
    </Flex>
    
    </>
  );
}