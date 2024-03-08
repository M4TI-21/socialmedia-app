import { Heading, Text, Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import ViewNote from "./ViewNote";

export default function Note(props) {
    const [displayNoteActive, setDisplayNoteActive] = useState("Inactive")

    const displayNote = (e) => {
        e.preventDefault();
        if(displayNoteActive === "Active"){
            setDisplayNoteActive("Inactive");
        }
        else{
            setDisplayNoteActive("Active");
        }
    }
    
    return(
        <>
        <button onClick={displayNote} >
            <Box bg="#dfe1e2" maxW="32vw" minW="16vw" h="35vh" pr="1%" pl="1%" pt="2%" pb="3%" borderRadius="30px" ml="1vw" mr="1vw" mb="2vh">
                <Flex justifyContent="center" alignItems="center" maxW="100%" h="20%">
                    <Heading size="lg" wordBreak="break-all" textAlign="center">{props.title}</Heading>
                </Flex>

                <Flex width="calc(100%)" h="65%" pl="5%">
                    <Text fontSize="lg" overflow="hidden" textOverflow="ellipsis" wordBreak="break-all">{props.content}</Text>
                </Flex>
            </Box>
        </button>

        {displayNoteActive === "Active" && <ViewNote note_id={props.note_id} fetchAllNotes={props.fetchAllNotes}
        creationDate={props.creationDate} updateDate={props.updateDate} content={props.content} tag={props.tag} title={props.title} displayNote={displayNote}/>}
        </>
    );
}