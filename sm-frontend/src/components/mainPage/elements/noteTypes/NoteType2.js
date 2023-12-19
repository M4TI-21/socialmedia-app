import axios from "axios";
import { Heading, Text, Box, Flex, Button, Textarea, Container, Input } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useState } from "react";


export default function NoteType1(props) {

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

    return(
        <Box bg="#dfe1e2" minW="20%" maxW="50%"  h="450px" pr="1%" pl="1%" borderRadius="50px" ml="1vw" mr="1vw" mb="2vh">
            <Flex justifyContent="center" alignItems="center" maxW="100%" h="20%">
                <Heading size="lg" wordBreak="break-all" textAlign="center">{props.title}</Heading>
            </Flex>

            <Flex width="calc(100%)" h="65%">
                <Input type="text" placeholder="Insert task" />
            </Flex>
            
            <Flex justifyContent="space-evenly" alignItems="center" w="100%" h="20%">
                
                <Button leftIcon={<BiTrash />} colorScheme="red" size="md" onClick={() => deleteNoteOnClick(props.note_id)}>Delete</Button>

            </Flex>         
        </Box>
    );
}