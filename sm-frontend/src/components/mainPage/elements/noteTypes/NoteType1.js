import axios from "axios";
import { Heading, Text, Box, Flex, Button, Textarea } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useState } from "react";


export default function NoteType1(props) {
    const [edit, setEdit] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedContent, setUpdatedContent] = useState(props.content);

    const deleteNote = async (id) => {
        const noteID = id;
        axios.delete(`http://localhost:8080/main/deletenote/${noteID}`, {data: {noteID: noteID}})
        .then((res) => {
            console.log("Note deleted");
            props.fetchAllNotes();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteNoteOnClick = (id) => {
        deleteNote(id);
    }

    const editNote = async (id) => {
        const title = updatedTitle;
        const content = updatedContent;
        const noteID = id;
        axios.put(`http://localhost:8080/main/editnote/${noteID}`, {noteID, title, content})
        .then((res) => {
            console.log("Note updated");
            props.fetchAllNotes();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const editNoteOnClick = (id) => {
        if(edit === false){
            setEdit(true);
        }
        else if(edit === true){
            setEdit(false);
            editNote(id);
        }
    }

    const favoriteNote = (id) => {
        if(favorite === false){
            setFavorite(true);
            addToFavorites(id)
        }
        else if(favorite === true){
            setFavorite(false);
            deleteFromFavorites(id)
        }
    }

    const addToFavorites = async (id) => {
        const noteID = id;
        axios.put(`http://localhost:8080/main/addfav/${noteID}`, {noteID})
        .then((res) => {
            props.fetchAllNotes();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteFromFavorites = async (id) => {
        const noteID = id;
        axios.put(`http://localhost:8080/main/deletefav/${noteID}`, {noteID})
        .then((res) => {
            props.fetchAllNotes();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <Box bg="#dfe1e2" minW="16vw" maxW="52vw" h="45vh" pr="1%" pl="1%" pt="2%" pb="1%" borderRadius="50px" ml="1vw" mr="1vw" mb="2vh">
            {favorite === false && <Button colorScheme="white" position="relative" float="right" onClick={() => favoriteNote(props.note_id)}>Favorite</Button>}
            {favorite === true && <Button colorScheme="yellow" position="relative" float="right" onClick={() => favoriteNote(props.note_id)}>Favorite</Button>}

            {edit === false && <>
            <Flex justifyContent="center" alignItems="center" maxW="100%" h="20%">
                <Heading size="lg" wordBreak="break-all" textAlign="center">{props.title}</Heading>
            </Flex>

            <Flex width="calc(100%)" h="65%">
                <Text fontSize="lg" overflow="hidden" textOverflow="ellipsis" wordBreak="break-all">{props.content}</Text>
            </Flex>
            
            <Flex justifyContent="space-evenly" alignItems="center" w="100%" h="20%">
                
                <Button leftIcon={<BiEditAlt />} colorScheme="green" size="md" onClick={() => editNoteOnClick(props.note_id)}>Edit</Button>
                <Button leftIcon={<BiTrash />} colorScheme="red" size="md" onClick={() => deleteNoteOnClick(props.note_id)}>Delete</Button>
            </Flex>
            </>}
            
            {edit === true && <>
                <Flex className="noteHeader" h="20%" pt="5%">
                    <Textarea onChange={e =>setUpdatedTitle(e.target.value)} 
                    fontSize="3xl" resize="none" border="none" _focusVisible={false} textAlign="center" maxLength="60" >
                    {props.title}</Textarea>
                </Flex>

                <Flex className="noteBody" w="inherit" h="60%">
                    <Textarea onChange={e =>setUpdatedContent(e.target.value)}
                    fontSize="lg" resize="none" border="none" _focusVisible={false} h="100%"
                    >{props.content}</Textarea>
                </Flex>

                <Flex className="noteActions" justifyContent="space-evenly" alignItems="center" h="20%">
                    <Button leftIcon={<BiEditAlt />} colorScheme="green" size="md" onClick={() => editNoteOnClick(props.note_id)}>Submit changes</Button>
                    <Button colorScheme="red" size="md" onClick={() => editNoteOnClick(props.note_id)}>Cancel</Button>
                </Flex>
            </>}
        </Box>
    );
}