import { useState } from "react";
import axios from "axios";
import { Container, Flex, Button, Textarea, Heading, Text } from "@chakra-ui/react"

export default function NewBookmark(props) {
    const [BMname, setBMname] = useState("");
    const [errorMsg, setErrorMsg] = useState(null)

    const addBookmark = async () => {
        const email = props.email
        const name = BMname
        axios.post('http://localhost:8080/main/createbookmark', 
        {
            name,
            email,
        })
        .then((res) => {
            props.fetchAllNotes();
            props.fetchBookmarks();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const addBookmarkOnClick = (e) =>{
        e.preventDefault();
        setErrorMsg(null)
        if(BMname.length > 0){
            addBookmark();
            props.setNewBookmark("Inactive")
        }
        else{
            setErrorMsg("*Set a name")
        }
    }

    return(
        <Container pos="absolute" alignItems="center" justifyContent="center" zIndex="100" minW="100vw" minH="100vh" centerContent bg="blackAlpha.700">
            <Container mb="20vh" minW="20vw" maxW="28vw" h="28vh" bg="#dfe1e2" borderRadius="10px" p="1%">
                <Flex flexDirection="column" alignItems="center">
                    <Heading fontSize="2xl">New bookmark</Heading>
                    <Textarea h="10vh" resize="none" fontSize="xl" placeholder="e.g. School, Holiday" onChange={e => setBMname(e.target.value)} maxLength="20"/>
                </Flex>
                {errorMsg === null && <Text>&nbsp;</Text>}
                {errorMsg != null && <Text textAlign="center" color="red">{errorMsg}</Text>}
                <Flex flexDirection="row" justifyContent="space-between" >
                    <Button colorScheme="red" size="md" w="10vw" onClick={props.addNewBookmark}>Cancel</Button>
                    <Button bg="#333" color='white' _hover={{ bg: "#555"}} size="md" w="10vw" onClick={addBookmarkOnClick}>Submit</Button>
                </Flex>
            </Container>
        </Container>
    );
}