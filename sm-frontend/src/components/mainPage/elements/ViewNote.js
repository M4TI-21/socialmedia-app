import { useState } from "react";
import { Heading, Container, Flex, IconButton, Text, Button, Textarea } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { BiEditAlt, BiTrash } from "react-icons/bi";
import axios from "axios";
import DeleteNote from "./DeleteNote";
import Moment from 'react-moment';

export default function ViewNote(props) {
    const [edit, setEdit] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedContent, setUpdatedContent] = useState(props.content);
    const [deleteAlertActive, setDeleteAlertActive] = useState("Inactive")

    const editNote = async (id) => {
        const title = updatedTitle;
        const content = updatedContent;
        const noteID = id;
        axios.put(`http://localhost:8080/main/editnote/${noteID}`, 
        {
            noteID, 
            title, 
            content
        })
        .then((res) => {
            console.log("Note updated");
            props.fetchAllNotes(id);
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

    const cancelEditOnClick = (id) => {
        if(edit === true){
            setEdit(false);
        }
    }


    const deleteAlert = (e) => {
        e.preventDefault();
        if(deleteAlertActive === "Active"){
            setDeleteAlertActive("Inactive");
        }
        else{
            setDeleteAlertActive("Active");
        }
    }

    return(
        <>
        {edit === false &&
            <>
            <Container pos="fixed" zIndex="99" minW="100vw" minH="100vh"  centerContent bg="blackAlpha.700" top="0">
                <Container pos="absolute" minW="30%" maxW="40%" h="80vh" bg="#dfe1e2" mt="10vh" borderRadius="30px" p="2%">
                    <IconButton size="sm" icon={<CloseIcon />} onClick={props.displayNote} colorScheme="red" pos="absolute" top="4%" right="3%" aria-label="Close window"></IconButton>
                    
                    <Heading size="xl" textAlign="center" mb="5%">{props.title}</Heading>

                    <Flex maxH="50vh" maxW="36vw" mb="5%">
                        <Text fontSize="medium" maxW="36vw" h="50vh" overflow="auto">{props.content}</Text>
                    </Flex>

                    <Flex flexDir="row" justifyContent="space-around" w="36vw" mb="8%">
                        <Button leftIcon={<BiTrash />} colorScheme="red" minW="8vw" onClick={deleteAlert}>Delete</Button>
                        <Button leftIcon={<BiEditAlt />} colorScheme="green" minW="8vw" onClick={() => editNoteOnClick(props.note_id)}>Edit</Button> 
                    </Flex>
                    <Flex flexDir="row" justifyContent="space-evenly">
                        <Text fontWeight="bold" color="#666">Created: <Moment color="#666" format="DD MMM YYYY HH:mm">{props.creationDate}</Moment></Text>
                        <Text fontWeight="bold" color="#666">Last update: <Moment color="#666" format="DD MMM YYYY HH:mm">{props.updateDate}</Moment></Text>
                        <Flex flexDir="row">
                            <Text fontWeight="bold" color="#666">Author: &nbsp;s</Text>
                            <Text fontWeight="bold">{props.tag}</Text>
                        </Flex>
                        
                    </Flex>

                </Container>
            </Container>
            {deleteAlertActive === "Active" && <DeleteNote note_id={props.note_id} fetchAllNotes={props.fetchAllNotes} deleteAlert={deleteAlert}/>}
            </>
        }
        {edit === true && 
            <Container pos="fixed" zIndex="99" minW="100vw" minH="100vh"  centerContent bg="blackAlpha.700" top="0">
                <Container pos="absolute" minW="30%" maxW="40%" h="80vh" bg="#dfe1e2" mt="10vh" borderRadius="30px" p="2%">
                    <IconButton size="sm" icon={<CloseIcon />} onClick={props.displayNote} colorScheme="red" pos="absolute" top="4%" right="3%" aria-label="Close window"></IconButton>
                   
                    <Flex mb="5%" pt="5%" textAlign="center" w="36vw">
                        <Textarea onChange={e =>setUpdatedTitle(e.target.value)} bg="#eee" fontSize="2xl" resize="none" border="none" textAlign="center" maxLength="60" 
                        fontWeight="bold">{props.title}</Textarea>
                    </Flex>

                    <Flex justifyContent="space-evenly" alignItems="center" flexDirection="column" flexWrap="wrap" h="45vh" maxW="36vw" >
                        <Textarea onChange={e =>setUpdatedContent(e.target.value)} fontSize="lg" resize="none" border="none" _focusVisible={false} h="100%" bg="#eee"
                        >{props.content}</Textarea>
                    </Flex>

                    <Flex justifyContent="space-evenly" alignItems="center" h="20%" w="inherit">
                        <Button leftIcon={<BiEditAlt />} colorScheme="green" size="md" onClick={() => editNoteOnClick(props.note_id)}>Submit changes</Button>
                        <Button colorScheme="red" size="md" onClick={() => cancelEditOnClick(props.note_id)}>Cancel</Button>
                    </Flex>
                </Container>
            </Container>
        }
        </>
    );
}