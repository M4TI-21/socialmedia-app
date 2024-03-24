import axios from "axios";
import { Heading, Container, Flex, Button, Text } from "@chakra-ui/react"

export default function DeleteNote(props) {

    const deleteNote = async (id) => {
        const noteID = id;
        axios.delete(`http://localhost:8080/main/deletenote/${noteID}`, {data: {noteID: noteID}})
        .then((res) => {
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
        <Container pos="fixed" zIndex="101" minW="100%" minH="100vh" centerContent bg="blackAlpha.700" top="0">
            <Container pos="absolute" minW="30vw" maxW="40vw" minH="30vh" maxH="40vh"
                bg="#dfe1e2" mt="10vh" borderRadius="30px" pt="2%" pb="1%">
                <Heading size="xl" textAlign="center">Are you sure to delete?</Heading>
                <Text fontSize="xl" textAlign="center">You will not be able to retrieve your note!</Text>
                <Flex mt="3%" justifyContent="space-evenly" alignItems="center" flexDirection="row" flexWrap="wrap">
                    <Button onClick={props.deleteAlert} colorScheme="green" w="40%" h="5vh" aria-label="Submit note" mt="3%">Cancel</Button>
                    <Button onClick={() => deleteNoteOnClick(props.note_id)} colorScheme="red" w="40%" h="5vh" aria-label="Submit note" mt="3%">Confirm</Button>
                </Flex>
            </Container>
        </Container>
    );
}