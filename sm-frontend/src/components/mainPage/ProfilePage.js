import "./mainPageStyle.css";
import Note from "./elements/Note";
import axios from "axios";
import { Flex, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ProfilePage(props) {
  const [notes, setNotes] = useState([]);

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

  useEffect(() =>{
    fetchFavNotes();
  }, [])
  
  return (
    <>
    <Flex flexDir="column" w="100vw" minH="80vh">
      <Flex flexDir="column" alignItems="center" right="0" w="20vw" maxH="80vh">
          <Text fontSize="x-large" fontWeight="bold">Here are your favorite notes:</Text>
          <Flex flexDir="column" bg="#ebebeb" w="20vw" maxH="80vh" pt="1%" overflowX="auto">
            {notes.map(e => (
            <Note key={e.note_id} note_id={e.note_id} tag={props.tag} title={e.title} creationDate={e.creation_date} updateDate={e.update_date} content={e.content} email={props.email}
            color={e.color} notes={notes} fetchAllNotes={fetchFavNotes}/>
            ))}
          </Flex>
      </Flex>
    </Flex>
    </>
  );
}