import axios from "axios";
import { Heading, Text, Box, Flex, Button, IconButton } from "@chakra-ui/react";
import { BiStar, BiSolidStar } from "react-icons/bi";
import { useState, useEffect } from "react";
import ViewNote from "./ViewNote";
import Moment from "react-moment";

export default function Note(props) {
    const [displayNoteActive, setDisplayNoteActive] = useState("Inactive")
    const [isHover, setIsHover] = useState(false);
    const [isFav, setIsFav] = useState(props.favorite);
    const [activeBM, setActiveBM] = useState([]);

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
        filter: isHover ? "brightness(92%)" : "brightness(100%)"
    }

    const addToFavorite = async (id) => {
        const noteID = id;
        axios.put(`http://localhost:8080/main/setfavorite/${noteID}`, 
        {
            noteID
        })
        .then((res) => {
            props.fetchAllNotes();
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
        .then((res) => {
            props.fetchAllNotes();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const setFavoriteOnClick = (id) =>{
        addToFavorite(id);
        props.fetchAllNotes();
        setIsFav(true)
        
    }

    const unsetFavoriteOnClick = (id) =>{
        deleteFromFavorite(id);
        props.fetchAllNotes();
        setIsFav(false)
    }

    const getBMname = async () => {
        axios.post(`http://localhost:8080/main/getBMname`, 
        {
            noteID: props.note_id,
            headers: {"x-access-token": localStorage.getItem("token")}
        })
        .then((res) => {
            setActiveBM(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getBMname();
    }, [])

    return(
        <>
            <Box bg={props.color} minW="16vw" maxW="24vw" h="35vh" pr="1%" pl="1%" pt="1%" pb="3%" borderRadius="10px" ml="1vw" mr="1vw" mb="1vw"
            style={hoverStyle} onMouseEnter={hoverTrue} onMouseLeave={hoverFalse} boxShadow="xl">
                <Box w="inherit" h="90%">
                    
                    <Flex alignItems="center" maxW="100%" h="4vh" flexDir="row" pt="5%" mb="1vh">
                        <Heading size="md" wordBreak="break-all">{props.title}</Heading>
                        <Text fontSize="x-small">@{activeBM}</Text>
                        {isFav === 1 && <IconButton icon={<BiSolidStar />} size="lg" _hover={{ bg: "none"}} bg="none" position="absolute" right="0" mr="5%" onClick={() => unsetFavoriteOnClick(props.note_id)}/>}
                        {isFav === 0 && <IconButton icon={<BiStar />} size="lg" _hover={{ bg: "none"}} bg="none" position="absolute" right="0" mr="5%" onClick={() => setFavoriteOnClick(props.note_id)}/>}  
                    </Flex>
                    
                    <Flex width="calc(100%)" h="24vh" pl="2%" pr="2%" onClick={displayNote} mb="1vh">
                        <Text fontSize="lg" overflow="hidden" textOverflow="ellipsis" wordBreak="break-all" >{props.content}</Text>
                    </Flex>
                    <Flex h="3vh" justifyContent="flex-end">
                        <Text fontSize="smaller"><Moment format="DD MMM YYYY HH:mm">{props.updateDate}</Moment></Text>
                    </Flex>
                </Box>
            </Box>

        {displayNoteActive === "Active" && <ViewNote note_id={props.note_id} fetchAllNotes={props.fetchAllNotes} bookmarks={props.bookmarks} setBookmarks={props.setBookmarks}
        creationDate={props.creationDate} updateDate={props.updateDate} content={props.content} tag={props.tag} title={props.title} displayNote={displayNote} color={props.color}
        defaultBM={props.defaultBM} activeBM={activeBM} setActiveBM={setActiveBM} getBMname={getBMname}/>}
        </>
    );
}