import Note from "./elements/Note";
import CreateNote from "./elements/CreateNote";
import "./mainPageStyle.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {Flex, Button, Input, Text, InputGroup, InputLeftAddon, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { SearchIcon, AddIcon } from '@chakra-ui/icons'
import { BiMenu } from "react-icons/bi";
import NewBookmark from "./elements/NewBookmark";
import EditBookmarks from "./elements/EditBookmarks";

export default function NotePage(props) {
  const [addNoteActive, setAddNoteActive] = useState("Inactive");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [newBookmark, setNewBookmark] = useState("Inactive");
  const [editBookmarks, setEditBookmarks] = useState("Inactive");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const timerId = useRef(null)

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
      fetchAllNotes();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchBookmarks();
  }, [])
  
  const fetchNoteGroup = async (id) => {
    axios.post("http://localhost:8080/main/fetch_note_group", 
    {
      bookmarkID: id,
      email: props.email
    })
    .then((res) => {
        setNotes(res.data);
    })
    .catch((err) => {
        console.log(err);
    })
  }

  const fetchNoteGroupOnClick = (id) =>{
    fetchNoteGroup(id)
  }

  const fetchFavNotes = async () => {
    axios.get("http://localhost:8080/main/notes/fetch_fav", {
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

  const fetchFavOnClick = (id) =>{
    fetchFavNotes(id)
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

  const editBookmarksOnClick = (e) => {
    e.preventDefault();
    if(editBookmarks === "Active"){
      setEditBookmarks("Inactive");
    }
    else{
      setEditBookmarks("Active");
    }
  }

  useEffect(() => {
    if(showDeleteAlert || showCreateAlert){
      timerId.current = setTimeout(() => {
        setShowDeleteAlert(false);
        setShowCreateAlert(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timerId.current);
    };
  }, [showDeleteAlert, showCreateAlert]);

  return (
    <>
    <Flex>
      <InputGroup>
        <InputLeftAddon>
          <SearchIcon />
        </InputLeftAddon>
        <Input onChange={(e) => {setSearch(e.target.value)}} type="text" placeholder="Search your notes..." minW="50vw" maxW="55vw"/>
      </InputGroup>

      <Menu>
        <MenuButton as={Button} aria-label="options" size="md" rightIcon={<BiMenu />}>Bookmarks &nbsp;</MenuButton>
          <MenuList>
              <MenuItem onClick={fetchAllNotes}>All notes</MenuItem>
              <MenuItem onClick={fetchFavOnClick}>Favorite notes</MenuItem>
              <MenuDivider />
              {bookmarks.map(e => (
                e.bookmark_id !== props.defaultBM &&
                <MenuItem key={e.bookmark_id} onClick={e => fetchNoteGroupOnClick(e.target.value)} value={e.bookmark_id}>{e.bm_name}</MenuItem>
              ))}
              <MenuDivider />
              <MenuItem onClick={addNewBookmark}>New bookmark</MenuItem>
              <MenuItem onClick={editBookmarksOnClick}>Edit bookmarks</MenuItem>
          </MenuList>
      </Menu>

    </Flex>
    {addNoteActive === "Active" && 
    <CreateNote addNoteActiveOnClick={addNoteActiveOnClick} email={props.email} fetchAllNotes={fetchAllNotes} setAddNoteActive={setAddNoteActive} defaultBM={props.defaultBM} 
      setShowCreateAlert={setShowCreateAlert}/>
    }

    <Flex justifyContent="center" mt="1%">
        <Text>Number of notes: {notes.length}</Text>
    </Flex>

    {addNoteActive === "Inactive" &&
    <Button position="fixed" zIndex="100" bottom="0" mb="2%" size="md" leftIcon={<AddIcon />} bg="#333" color='white' _hover={{ bg: "#555"}} onClick={addNoteActiveOnClick} minW="8vw">ADD NOTE</Button>
    }

    {newBookmark === "Active" &&
    <NewBookmark addNewBookmark={addNewBookmark} email={props.email} setNewBookmark={setNewBookmark} fetchAllNotes={fetchAllNotes} fetchBookmarks={fetchBookmarks}/>
    }
    {editBookmarks === "Active" &&
    <EditBookmarks bookmarks={bookmarks} editBookmarks={editBookmarks} email={props.email} EditBookmarks={EditBookmarks} fetchAllNotes={fetchAllNotes} fetchBookmarks={fetchBookmarks}
     editBookmarksOnClick={editBookmarksOnClick} defaultBM={props.defaultBM}/>
    }
    
    <Flex w="100%" minH="40vh" flexDirection="row" justifyContent="center" flexWrap="wrap" pl="3%" pr="3%">
        {notes.map(e => (
        <Note key={e.note_id} note_id={e.note_id} tag={props.tag} title={e.title} creationDate={e.creation_date} updateDate={e.update_date} content={e.content} email={props.email}
        color={e.color} favorite={e.favorite} notes={notes} fetchAllNotes={fetchAllNotes} bookmarks={bookmarks} setBookmarks={setBookmarks} defaultBM={props.defaultBM} setShowDeleteAlert={setShowDeleteAlert}/>
        ))}
    </Flex>
    
    {showDeleteAlert === true &&
        <Alert status="success" position="fixed" w="30vw" minH="7vh" right="0" bottom="0">
          <AlertIcon />
          <Flex justifyContent="center" alignItems="center" flexDir="column" ml="2vw" w="100%">
            <AlertTitle textAlign="center" fontSize="large">Note successfully deleted!</AlertTitle>
          </Flex>
        </Alert>
      }

      {showCreateAlert === true &&
        <Alert status="success" position="fixed" w="30vw" minH="7vh" right="0" bottom="0">
          <AlertIcon />
          <Flex justifyContent="center" alignItems="center" flexDir="column" ml="2vw" w="100%">
            <AlertTitle textAlign="center" fontSize="large">Note successfully created!</AlertTitle>
          </Flex>
        </Alert>
      }
    </>
  );
}