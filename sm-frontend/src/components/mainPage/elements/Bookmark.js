import axios from "axios";
import { Text, Flex, Button, Textarea, IconButton, Tooltip } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { DeleteIcon } from '@chakra-ui/icons'
import { useState } from "react";


export default function Bookmark(props) {
    const [edit, setEdit] = useState(false);
    const [updatedName, setUpdatedName] = useState(props.bm_name);

    const deleteBookmark = async (id) => {
        const bookmarkID = id;
        axios.delete(`http://localhost:8080/main/deletebookmark/${bookmarkID}`, 
        {
            data: {
                defaultBM: props.defaultBM,
                bookmarkID: bookmarkID
            }  
        })
        .then((res) => {
            props.fetchBookmarks();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteBMOnClick = (id) => {
        deleteBookmark(id);
    }

    const editBookmark = async (id) => {
        const bm_name = updatedName;
        const bookmarkID = id;
        axios.put(`http://localhost:8080/main/editbookmark/${bookmarkID}`, 
        {
            bm_name, 
            bookmarkID
        })
        .then((res) => {
            props.fetchBookmarks();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const editBMOnClick = (id) => {
        if(edit === false){
            setEdit(true);
        }
        else if(edit === true){
            setEdit(false);
            editBookmark(id);
        }
    }

    const cancelEditOnClick = () => {
        if(edit === true){
            setEdit(false);
        }
    }

    return(
        <>
        {edit === false &&
            <Flex flexDir="row" alignItems="center" pr="2%" pl="2%" bg="#eee" w="30vw" minH="5vh" borderRadius="10px" m="2vh">
                
                <Flex flexDir="row" alignItems="center" w="20vw">
                    <Text fontSize="md" fontWeight="bold" mt="auto" mb="auto">{props.bm_name}</Text>
                </Flex>

                <Flex flexDir="row" justifyContent="space-between" w="8vw">
                    <Tooltip label="Edit"><IconButton icon={<BiEditAlt color="white" w="6"/>} bg="none" _hover={{ bg: "#bbb"}} onClick={() => editBMOnClick(props.bookmark_id)}/></Tooltip>
                    <Tooltip label="Delete"><IconButton icon={<DeleteIcon color="red.500"/>} bg="none" size="md" _hover={{ bg: "#bbb"}} onClick={() => deleteBMOnClick(props.bookmark_id)}/></Tooltip>
                </Flex>
            </Flex>
        }

        {edit === true &&
            <Flex flexDir="row" alignItems="center" pr="2%" pl="2%" bg="#eee" w="30vw" minH="5vh" borderRadius="10px" ml="1vw" mr="1vw">
                <Flex flexDir="row" alignContent="center" w="40vw">
                    <Textarea onChange={e =>setUpdatedName(e.target.value)} fontSize="md" resize="none" border="none" _focusVisible={false} defaultValue={props.bm_name}></Textarea>
                </Flex>
                <Flex flexDir="row" justifyContent="space-between" w="12vw">
                    <Button bg="#333" color='white' _hover={{ bg: "#555"}} size="sm" onClick={() => editBMOnClick(props.bookmark_id)}>✔</Button>
                    <Button colorScheme="red" size="sm" onClick={() => cancelEditOnClick(props.bookmark_id)}>✖</Button>
                </Flex>
            </Flex>
        }
        </>
    );
}