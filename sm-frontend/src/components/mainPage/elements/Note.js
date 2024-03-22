import axios from "axios";
import { Heading, Text, Box, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import ViewNote from "./ViewNote";

export default function Note(props) {
    const [displayNoteActive, setDisplayNoteActive] = useState("Inactive")
    const [isHover, setIsHover] = useState(false);
    const [isFav, setIsFav] = useState(props.favorite)

    const displayNote = (e) => {
        e.preventDefault();
        if(displayNoteActive === "Active"){
            setDisplayNoteActive("Inactive");
        }
        else{
            setDisplayNoteActive("Active");
        }
    }

    const hoverTrue = () => {
        setIsHover(true);
     };
     const hoverFalse = () => {
        setIsHover(false);
     };

    const hoverStyle = {
        filter: isHover ? "brightness(80%)" : "brightness(100%)"
    }

    const addToFavorite = async (id) => {
        const noteID = id;
        axios.put(`http://localhost:8080/main/setfavorite/${noteID}`, 
        {
            noteID
        })
        .then(() => {
            props.fetchAllNotes(id);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteFromFavorite = async (id) => {
        const noteID = id;
        axios.put(`http://localhost:8080/main/unsetfavorite/${noteID}`, 
        {
            noteID
        })
        .then(() => {
            props.fetchAllNotes(id);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const setFavoriteOnClick = (id) =>{
        addToFavorite(id);
        props.fetchAllNotes(id);
        setIsFav(true)
        
    }

    const unsetFavoriteOnClick = (id) =>{
        deleteFromFavorite(id);
        props.fetchAllNotes(id);
        setIsFav(false)
    }
    
    return(
        <>
            <Box bg={props.color} maxW="32vw" minW="16vw" h="35vh" pr="1%" pl="1%" pt="2%" pb="3%" borderRadius="30px" ml="1vw" mr="1vw" mb="1vw"
            style={hoverStyle} onMouseEnter={hoverTrue} onMouseLeave={hoverFalse} >
                <Box onClick={displayNote} w="inherit" h="90%">
                    <Flex justifyContent="center" alignItems="center" maxW="100%" h="10%" flexDir="column" pt="5%">
                        <Heading size="lg" wordBreak="break-all" textAlign="center">{props.title}</Heading>
                    </Flex>
                    <hr></hr>
                    <Flex width="calc(100%)" h="80%" pl="5%">
                        <Text fontSize="lg" overflow="hidden" textOverflow="ellipsis" wordBreak="break-all">{props.content}</Text>
                    </Flex>
                </Box>
                <Flex justifyContent="center" alignItems="center">
                    {isFav === 1 && <Button onClick={() => unsetFavoriteOnClick(props.note_id)} colorScheme="yellow">⭐</Button>}
                    {isFav === 0 && <Button onClick={() => setFavoriteOnClick(props.note_id)} colorScheme="gray">⭐</Button>}
                </Flex>
            </Box>

        {displayNoteActive === "Active" && <ViewNote note_id={props.note_id} fetchAllNotes={props.fetchAllNotes} bookmarks={props.bookmarks} setBookmarks={props.setBookmarks}
        creationDate={props.creationDate} updateDate={props.updateDate} content={props.content} tag={props.tag} title={props.title} displayNote={displayNote} color={props.color}/>}
        </>
    );
}