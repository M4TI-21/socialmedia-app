import axios from "axios";
import { Heading, Text, Box, Flex, Button } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";

export default function NoteType1(props) {
    
    const deleteNote = async () => {
        const noteID = props.note_id;
        axios.delete('http://localhost:8080/main/deletenote', {noteID})
        .then((res) => {
        if(res.data.status === "Note deleted successfully"){
            console.log("Note deleted");
        }
        })
        .catch((err) => {
        console.log(err);
        })
    }

    const deleteNoteOnClick = () => {
        deleteNote();
    }

    return(
        <Box className="noteContainer" bg="#dfe1e2" minW="20%" maxW="20%" minH="400px" maxH="500px" pr="1%" pl="1%" borderRadius="50px" ml="2vw" mr="2vw" mb="2vh">
            <Flex className="noteHeader" justifyContent="center" alignItems="center" w="100%" h="20%">
                <Heading size="xl">{props.title}</Heading>
            </Flex>
            <Flex className="noteBody" w="100%" h="60%">
                <Text fontSize="lg">{props.content}</Text>
            </Flex>
            <Flex className="noteActions" justifyContent="space-evenly" alignItems="center" w="100%" h="20%">
                <Button leftIcon={<BiEditAlt />} colorScheme="green" size="md">Edit</Button>
                <Button leftIcon={<BiTrash />} colorScheme="red" size="md" onClick={() => deleteNoteOnClick()}>Delete</Button>
            </Flex>
        </Box>
    );
}