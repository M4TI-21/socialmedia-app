import { useState } from "react";
import { Heading, Container, Flex, IconButton, Text, Button, Textarea, Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { BiEditAlt, BiTrash, BiMenu } from "react-icons/bi";
import axios from "axios";
import DeleteNote from "./DeleteNote";
import Moment from 'react-moment';

export default function ViewNote(props) {
    const [edit, setEdit] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedContent, setUpdatedContent] = useState(props.content);
    const [updatedColor, setUpdatedColor] = useState(props.color);
    const [deleteAlertActive, setDeleteAlertActive] = useState("Inactive")
    const [bmList, setBmList] = useState(props.bookmarks)
    const [bookmark, setBookmark] = useState("")

    const editNote = async (id) => {
        const title = updatedTitle;
        const content = updatedContent;
        const color = updatedColor;
        const noteID = id;
        axios.put(`http://localhost:8080/main/editnote/${noteID}`, 
        {
            noteID, 
            title, 
            content,
            color
        })
        .then(() => {
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

    const addBookmark = async (id) => {
        const noteID = id;
        axios.put(`http://localhost:8080/main/addbookmark/${noteID}`, 
        {
            noteID,
            bookmark
        })
        .then(() => {
            props.fetchAllNotes(id);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <>
        {edit === false &&
            <>
            <Container pos="fixed" zIndex="97" minW="100vw" minH="100vh"  centerContent bg="blackAlpha.700" top="0">
                <Container pos="absolute" minW="30%" maxW="40%" h="80vh" bg="#dfe1e2" mt="10vh" borderRadius="20px" pt="1%" pl="2%" pr="2%">
                    <IconButton size="sm" icon={<CloseIcon />} onClick={props.displayNote} colorScheme="red" pos="absolute" top="4%" right="3%" aria-label="Close window"></IconButton>
                    
                    <Heading size="large" textAlign="center" mb="5%">{props.title}</Heading>

                    <Flex h="45vh" maxW="36vw">
                        <Text fontSize="medium" maxW="36vw" maxH="45vh" overflow="auto">{props.content}</Text>
                    </Flex>

                    <Flex alignItems="center" justifyContent="center" mt="3vh">
                        <Menu>
                            <MenuButton as={Button} aria-label="options" leftIcon={<BiMenu />}>Bookmarks</MenuButton>
                            <MenuList>
                                {bmList.length === 0 && 
                                    <MenuItem>No bookmarks</MenuItem>
                                }
                                {bmList.map(e => (
                                    <MenuItem onClick={() => {setBookmark(e.bookmark_id); addBookmark(props.note_id)}} key={e.bookmark_id}>{e.bm_name}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </Flex>

                    <Flex flexDir="row" justifyContent="space-around" w="36vw" mb="5%">
                        <Button leftIcon={<BiTrash />} colorScheme="red" minW="8vw" onClick={deleteAlert}>Delete</Button>
                        <Button leftIcon={<BiEditAlt />} colorScheme="green" minW="8vw" onClick={() => editNoteOnClick(props.note_id)}>Edit</Button> 
                    </Flex>

                    <Flex flexDir="row" justifyContent="space-evenly" bottom="1">
                        <Text fontWeight="bold" color="#666">Created: <Moment color="#666" format="DD MMM YYYY HH:mm">{props.creationDate}</Moment></Text>
                        <Text fontWeight="bold" color="#666">Last update: <Moment color="#666" format="DD MMM YYYY HH:mm">{props.updateDate}</Moment></Text>
                        <Flex flexDir="row">
                            <Text fontWeight="bold" color="#666">Author: &nbsp;</Text>
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
                        fontWeight="bold" defaultValue={props.content}/>
                    </Flex>

                    <Flex justifyContent="space-evenly" alignItems="center" flexDirection="column" flexWrap="wrap" h="40vh" maxW="36vw" >
                        <Textarea onChange={e =>setUpdatedContent(e.target.value)} fontSize="lg" resize="none" border="none" _focusVisible={false} h="100%" bg="#eee" defaultValue={props.content}/>
                    </Flex>
                    
                    <Flex h="5vh" w="36vw" justifyContent="flex-start" alignItems="center">
                        <Text fontSize="lg" fontWeight="semibold" mt="auto" mb="auto">Select new backgroud color:&nbsp;&nbsp;&nbsp;</Text>
                        <input type="color" onChange={e =>setUpdatedColor(e.target.value)} defaultValue={props.color} />
                    </Flex>

                    <Flex justifyContent="space-evenly" alignItems="center" h="20%" w="inherit">
                        <Button colorScheme="red" size="md" onClick={() => cancelEditOnClick(props.note_id)}>Cancel</Button>
                        <Button leftIcon={<BiEditAlt />} colorScheme="green" size="md" onClick={() => editNoteOnClick(props.note_id)}>Submit changes</Button>
                    </Flex>
                </Container>
            </Container>
        }
        </>
    );
}