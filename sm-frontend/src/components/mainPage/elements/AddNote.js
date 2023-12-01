import { Heading, Text, Container, Box, Flex, Button, IconButton } from "@chakra-ui/react"
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons"
import { useState } from "react";
import CreateNote1 from "./addNotes/CreateNote1";
import CreateNote2 from "./addNotes/CreateNote2";
import CreateNote3 from "./addNotes/CreateNote3";

export default function AddNote(props) {
    const [active1, setActive1] = useState("Inactive");
    const [active2, setActive2] = useState("Inactive");
    const [active3, setActive3] = useState("Inactive");

    const active1OnClick = (e) => {
        e.preventDefault();
        if(active1 === "Active"){
            setActive1("Inactive");
        }
        else{
            setActive1("Active");
        }
    }

    const active2OnClick = (e) => {
        e.preventDefault();
        if(active2 === "Active"){
            setActive2("Inactive");
        }
        else{
            setActive2("Active");
        }
    }

    const active3OnClick = (e) => {
        e.preventDefault();
        if(active3 === "Active"){
            setActive3("Inactive");
        }
        else{
            setActive3("Active");
        }
    }
    
    return(
        <Container pos="absolute" zIndex="99" minW="100vw" minH="100vh" centerContent bg="blackAlpha.700">
            <Container className="addNoteOptions" pos="absolute" minW="70%" maxW="70%" minH="80%" maxH="80%"
                bg="#dfe1e2" mt="10vh" borderRadius="50px" p="1%">
                <Heading size="2xl" textAlign="center">Choose style:</Heading>
                <Flex className="notesList" mt="3%" justifyContent="space-evenly" flexDirection="row" flexWrap="wrap">

                    <Box className="noteType type1" maxW="30vw" minW="30vw" minH="30vh" pl="3%" pr="1%" pt="1%" pb="1%"
                        border="1px solid black" borderRadius="30px" pos="relative" mb="2%">
                        <Heading size="lg" fontWeight="bold">Classic note</Heading>
                        <Text fontSize="xl" mr="3vw">What can we say? Just type some text, maybe attach some media or files. Feel free, you decide!</Text>
                        <Button onClick={active1OnClick} size="md" rightIcon={<ArrowForwardIcon />} colorScheme="green" pos="absolute" bottom="5%" right="5%">Use</Button>
                    </Box>
                    
                    <Box className="noteType type2"  maxW="30vw" minW="30vw" minH="30vh" pl="3%" pr="1%" pt="1%" pb="1%"
                        border="1px solid black"borderRadius="30px" pos="relative" mb="2%">
                        <Heading size="lg" fontWeight="bold">To-do list</Heading>
                        <Text fontSize="xl" mr="3vw">Organize your tasks using this to-do list note. Add tasks, check them done and stay aware!</Text>
                        <Button onClick={active2OnClick} size="md" rightIcon={<ArrowForwardIcon />} colorScheme="green" pos="absolute" bottom="5%" right="5%">Use</Button>
                    </Box>

                    <Box className="noteType type3"maxW="30vw" minW="30vw"  minH="30vh" pl="3%" pr="1%" pt="1%" pb="1%"
                        border="1px solid black" borderRadius="30px" pos="relative" mb="2%">
                        <Heading size="lg" fontWeight="bold">Online note</Heading>
                        <Text fontSize="xl" mr="3vw">Do you have a team project and need a place to write down brainstorm's ideas? You've came to the right place!</Text>
                        <Button onClick={active3OnClick} size="md" rightIcon={<ArrowForwardIcon />} colorScheme="green" pos="absolute" bottom="5%" right="5%">Use</Button>
                    </Box>

                    <Box className="noteType type4" maxW="30vw" minW="30vw" minH="30vh" pl="3%" pr="1%" pt="1%" pb="1%"
                        border="1px solid black" borderRadius="30px" pos="relative" mb="2%">
                        <Heading size="lg" fontWeight="bold">Another option</Heading>
                        <Text fontSize="xl" mr="3vw">Work in progress... Stay tuned!</Text>
                        <Button size="md" rightIcon={<ArrowForwardIcon />} colorScheme="green" pos="absolute" bottom="5%" right="5%" isDisabled>Use</Button>
                    </Box>
                </Flex>
                <IconButton size="sm" icon={<CloseIcon />} onClick={props.addNoteActiveOnClick} colorScheme="red" pos="absolute" top="4%" right="3%" aria-label="Close window"></IconButton>
            </Container>
            {active1 === "Active" && <CreateNote1 closeOnClick={active1OnClick} setAddNoteActive={props.setAddNoteActive} email={props.email} 
            fetchAllNotes={props.fetchAllNotes} setActive1={setActive1}/>}
            {active2 === "Active" && <CreateNote2 closeOnClick={active2OnClick} setAddNoteActive={props.setAddNoteActive} email={props.email}
            fetchAllNotes={props.fetchAllNotes} setActive1={setActive1}/>}
            {active3 === "Active" && <CreateNote3 closeOnClick={active3OnClick} setAddNoteActive={props.setAddNoteActive} email={props.email}
            fetchAllNotes={props.fetchAllNotes} setActive1={setActive1}/>}
        </Container>
    );
}