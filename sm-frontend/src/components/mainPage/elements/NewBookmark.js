import { useState } from "react";
import axios from "axios";
import { Container, Flex, Button, Textarea, Heading} from "@chakra-ui/react"

export default function NewBookmark(props) {
    const [name, setName] = useState("");

    const addBookmark = async () => {
        const email = props.email;
        const color = "red"
        axios.post('http://localhost:8080/main/createnote', 
        {
            name,
            email,
            color
        })
        .then((res) => {
            props.fetchAllNotes();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <Container pos="absolute" alignItems="center" justifyContent="center" zIndex="99" minW="100vw" minH="100vh" centerContent bg="blackAlpha.700">
            <Container mb="20vh" minW="20vw" maxW="25vw" h="25vh" bg="#dfe1e2" borderRadius="10px" p="1%">
                <Flex flexDirection="column" alignItems="center">
                    <Heading fontSize="2xl">New bookmark</Heading>
                    <Textarea h="10vh" resize="none" fontSize="xl" placeholder="e.g. School, Holiday"/>
                </Flex>
                <Flex flexDirection="row" justifyContent="space-between" mt="2%">
                    <Button colorScheme="red" size="md" w="10vw" >Cancel</Button>
                    <Button bg="#333" color='white' _hover={{ bg: "#555"}} size="md" w="10vw">Submit</Button>
                </Flex>
            </Container>
        </Container>
    );
}