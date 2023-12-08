import axios from "axios";
import { Heading, Text, Box, Flex, Button, Textarea } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import "./note.css"
import { useState, useRef, useEffect } from "react";

export default function NoteType1(props) {
    const [edit, setEdit] = useState(false)

    const deleteNote = async (id) => {
        const noteID = id;
        axios.delete(`http://localhost:8080/main/deletenote/${noteID}`, {data: {noteID: noteID}})
        .then((res) => {
            console.log("Note deleted");
            props.fetchAllNotes();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteNoteOnClick = (id) => {
        deleteNote(id);
    }

    const OverflowCheck = () => {
        const parentRef = useRef(null);
        const childRef = useRef(null);
        const [isOverflowing, setIsOverflowing] = useState(false);
      
        useEffect(() => {
          const parent = parentRef.current;
          const child = childRef.current;
      
          const checkOverflow = () => {
            if (child.offsetHeight > parent.offsetHeight) {
              setIsOverflowing(true);
            } else {
              setIsOverflowing(false);
            }
          };
      
          checkOverflow();
      
          window.addEventListener('resize', checkOverflow);
      
          return () => {
            window.removeEventListener('resize', checkOverflow);
          };
        }, []);
    }

    const editNote = async (id) => {
        const title = props.title;
        const content = props.content;
        const noteID = id;
        axios.put(`http://localhost:8080/main/deletenote/${noteID}`, {data: {noteID: noteID}, title, content})
        .then((res) => {
            if(res.data.status === "Note updated successfully"){
            console.log("Note updated");
            props.fetchAllNotes();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const editNoteonClick = () => {
        if(edit === false){
            setEdit(true);
        }
        else if(edit === true){
            setEdit(false);
            editNote();
        }
    }

    return(
        <>
        {edit === false &&
        <Box id="note" className="noteContainer" bg="#dfe1e2" minW="20%" maxW="50%" minH="400px" maxH="500px" pr="1%" pl="1%" borderRadius="50px" ml="1vw" mr="1vw" mb="2vh">

            <Flex className="noteHeader" justifyContent="center" alignItems="center" w="inherit" h="20%">
                <Heading size="lg">{props.title}</Heading>
            </Flex>

            <Flex className="noteBody" maxW="100%" h="60%">
                <Text id="noteContent" fontSize="lg" className="noteContent">{props.content}</Text>
            </Flex>
            
            <Flex className="noteActions" justifyContent="space-evenly" alignItems="center" w="100%" h="20%">
                {props.content.length > 100 &&
                <Text>Longer</Text>
                }
                
                {props.content.length < 100 &&
                <Text>Shorter</Text>
                }

                <Button leftIcon={<BiEditAlt />} colorScheme="green" size="md" onClick={editNoteonClick}>Edit</Button>
                <Button leftIcon={<BiTrash />} colorScheme="red" size="md" onClick={() => deleteNoteOnClick(props.note_id)}>Delete</Button>
            </Flex>
        </Box>
        }
        {edit === true &&
        <Box id="note" className="noteContainer" bg="#dfe1e2" minW="20%" maxW="50%" minH="400px" maxH="500px" borderRadius="50px" ml="1vw" mr="1vw" mb="2vh">
            
            <Flex className="noteHeader" align="center" w="90%" h="20%" pt="5%">
                <Textarea fontSize="3xl" resize="none" borderRadius="20px" textAlign="center" maxLength="60">{props.title}</Textarea>
            </Flex>

            <Flex className="noteBody" w="90%" h="60%">
                <Textarea fontSize="lg" resize="none" borderRadius="20px" h="100%">{props.content}</Textarea>
            </Flex>

            <Flex className="noteActions" justifyContent="space-evenly" alignItems="center" w="100%" h="20%">
                <Button leftIcon={<BiEditAlt />} colorScheme="green" size="md" onClick={editNoteonClick}>Submit changes</Button>
            </Flex>
        </Box>
        }
        </>
    );
}