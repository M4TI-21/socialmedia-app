import { useState } from "react";
import axios from "axios";
import { Heading, Container, Flex, Button, IconButton, Textarea, Text, Input } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"

export default function CreateNote1(props) {
    const [title, setTitle] = useState("");
    const [errorMsg, setErrorMsg] = useState([]);

    const noteValidation = () => {
        let error = {};
    
        if(title === ""){
          error.title = "*Set note's title";
        }
        else{
          error.title = "";
        }
    
        return error;
      }

    const email = props.email;
    const type = "Todo Note";
    const content = "";
    const addNote = async () => {
        axios.post('http://localhost:8080/main/createnote', {email, title, content, type})
        .then((res) => {
            if(res.data.status === "Note created successfully"){
            console.log("Note created");
            props.fetchAllNotes();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    const addNoteOnClick = (e) => {
        e.preventDefault();
        const error = noteValidation(title);
        setErrorMsg(error);

        if(error.title !== ""){
            console.log("Error");
        }
        else{
            props.setActive1("Inactive");
            props.setAddNoteActive("Inactive");
            addNote(); 
        }
    }

    return(
        <Container pos="absolute" zIndex="99" minW="100vw" minH="100vh" centerContent bg="blackAlpha.700">
            <Container pos="absolute" minW="30%" maxW="40%" minH="35%" maxH="40%"
                bg="#dfe1e2" mt="10vh" borderRadius="50px" p="1%">
                <Heading size="2xl" textAlign="center">Create your note:</Heading>
                <Flex mt="3%" justifyContent="space-evenly" alignItems="center" flexDirection="column" flexWrap="wrap">

                    <Flex flexDirection="column" alignItems="center" w="90%" h="10vh">
                        <Textarea onChange={e => setTitle(e.target.value)} resize="none" placeholder="Title your note!" fontSize="2xl" 
                        textAlign="center" maxLength="60" w="inherit" h="inherit"/>
                        {errorMsg.title && <Text>{errorMsg.title}</Text>}
                    </Flex>
                    
                    <Flex flexDirection="column" alignItems="center" w="90%" h="5vh">
                        <Text fontSize="xl" mt="3%">You will be allowed to add your tasks after creating the note</Text>
                    </Flex>

                    <Button onClick={addNoteOnClick} colorScheme="green" w="40%" h="5vh" aria-label="Submit note" mt="3%">Submit</Button>
                </Flex>
                <IconButton size="sm" icon={<CloseIcon />} onClick={props.closeOnClick} colorScheme="red" pos="absolute" top="4%" right="3%" aria-label="Close window"></IconButton>
            </Container>
        </Container>
    );
}