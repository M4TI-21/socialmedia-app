import Note from "./elements/Note";
import CreateNote from "./elements/CreateNote";
import "./mainPageStyle.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {Flex, Button, Input, Text, InputGroup, InputLeftAddon, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { SearchIcon, AddIcon } from '@chakra-ui/icons'
import { BiMenu } from "react-icons/bi";
import NewBookmark from "./elements/NewBookmark";

export default function NotePage(props) {
  const [addNoteActive, setAddNoteActive] = useState("Inactive");
  const [notes, setNotes] = useState([]);
  // const [sort, setSort] = useState("date-desc");
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmark, setBookmark] = useState();
  const [newBookmark, setNewBookmark] = useState("Inactive")

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

  const fetchBookmarks = async () => {
    axios.get("http://localhost:8080/main/notes/bookmarks", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res) => {
      setBookmarks(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchBookmarks();
  }, [])

  const fetchNoteGroup = async () => {
    axios.get(`http://localhost:8080/main/notes/fetch_note_group`, 
    {
      bookmark,
      headers: {"x-access-token": localStorage.getItem("token")}
    
    })
    .then((res) => {
        setNotes(res.data);
    })
    .catch((err) => {
        console.log(err);
    })
  }

  const fetchGroup = () => {
    fetchNoteGroup();
  }

  const addNewBookmark = (e) => {
    e.preventDefault();
    if(newBookmark === "Active"){
      setNewBookmark("Inactive");
    }
    else{
      setNewBookmark("Active");
    }
  }

  return (
    <>
    <Flex>
      <InputGroup>
        <InputLeftAddon>
          <SearchIcon />
        </InputLeftAddon>
        <Input onChange={(e) => {setSearch(e.target.value)}} type="text" placeholder="Search your notes..." minW="50vw" maxW="55vw"/>
      </InputGroup>
        
        {/* {sort === "date-desc" && <Button onClick={() => sortNotesBtn()} w="16%">Sorting: by date descending</Button>}
        {sort === "date-asc" && <Button onClick={() => sortNotesBtn()} w="16%">Sorting: by date ascending</Button>}
        {sort === "fav" && <Button onClick={() => sortNotesBtn()} w="16%">Sorting: by favorites</Button>} */}
    <Menu>
      <MenuButton as={Button} aria-label="options" size="md" rightIcon={<BiMenu />}>Bookmarks &nbsp;</MenuButton>
        <MenuList>
            <MenuItem onClick={fetchAllNotes}>All notes</MenuItem>
            {bookmarks.map(e => (
              <MenuItem onClick={() => {setBookmark(e.bookmark_id); fetchGroup()}} key={e.bookmark_id}>{e.bm_name}</MenuItem>
            ))}
            <MenuDivider />
            <MenuItem onClick={addNewBookmark}>New bookmark</MenuItem>
        </MenuList>
    </Menu>
    </Flex>
    {addNoteActive === "Active" && 
    <CreateNote addNoteActiveOnClick={addNoteActiveOnClick} email={props.email} fetchAllNotes={fetchAllNotes} setAddNoteActive={setAddNoteActive}/>
    }

    <Flex justifyContent="center" mt="1%">
        <Text>Number of notes: {notes.length}</Text>
    </Flex>

    {addNoteActive === "Inactive" &&
    <Button position="fixed" zIndex="100" bottom="0" mb="2%" size="md" leftIcon={<AddIcon />} bg="#333" color='white' _hover={{ bg: "#555"}} onClick={addNoteActiveOnClick} minW="8vw">ADD NOTE</Button>
    }

    {newBookmark === "Active" &&
    <NewBookmark />
    }
    
    <Flex w="100%" minH="40vh" flexDirection="row" justifyContent="center" flexWrap="wrap" pl="3%" pr="3%">
        {notes.map(e => (
        <Note key={e.note_id} note_id={e.note_id} tag={props.tag} title={e.title} creationDate={e.creation_date} updateDate={e.update_date} content={e.content} email={props.email}
        color={e.color} favorite={e.favorite} notes={notes} fetchAllNotes={fetchAllNotes} bookmarks={bookmarks} setBookmarks={setBookmarks}/>
        ))}
    </Flex>
    
    </>
  );
}