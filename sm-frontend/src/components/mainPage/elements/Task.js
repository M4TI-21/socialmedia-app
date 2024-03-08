import axios from "axios";
import { Text, Flex, Button, Textarea } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { useState } from "react";


export default function Task(props) {
    const [edit, setEdit] = useState(false);
    //const [favorite, setFavorite] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(props.content);

    const deleteTask = async (id) => {
        const taskID = id;
        axios.delete(`http://localhost:8080/main/deletetask/${taskID}`, {data: {taskID: taskID}})
        .then((res) => {
            console.log("Task deleted");
            props.fetchTodoTasks();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deleteTaskOnClick = (id) => {
        deleteTask(id);
    }

    const editTask = async (id) => {
        const content = updatedContent;
        const taskID = id;
        axios.put(`http://localhost:8080/main/edittask/${taskID}`, 
        {
            taskID, 
            content
        })
        .then((res) => {
            console.log("Task updated");
            props.fetchTodoTasks();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const editTaskOnClick = (id) => {
        if(edit === false){
            setEdit(true);
        }
        else if(edit === true){
            setEdit(false);
            editTask(id);
        }
    }

    const cancelEditOnClick = () => {
        if(edit === true){
            setEdit(false);
        }
    }

    const setFinished = (id) => {
        const taskID = id;
        const finished = 1;
        axios.put(`http://localhost:8080/main/completetask/${taskID}`, 
        {
            finished,
            taskID
        })
        .then((res) => {
            console.log("Task completed");
            props.fetchTodoTasks();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const resetFinished = (id) => {
        const taskID = id;
        const finished = 0;
        axios.put(`http://localhost:8080/main/completetask/${taskID}`, 
        {
            finished,
            taskID
        })
        .then((res) => {
            console.log("Task completed");
            props.fetchTodoTasks();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <>
        {edit === false && props.finished === 0 &&
            <Flex flexDir="row" alignItems="center" pr="2%" pl="2%" bg="#dfe1e2" w="50vw" minH="5vh" borderRadius="50px" m="2vh">
                
                <Flex flexDir="row" alignItems="center" w="40vw">
                    <Text fontSize="md" fontWeight="bold" mt="auto" mb="auto">{props.content}</Text>
                </Flex>

                <Flex flexDir="row" justifyContent="space-between" w="14vw">
                    <Button colorScheme="blue" size="sm" w="4vw" onClick={() => setFinished(props.todo_id)}>Completed</Button>
                    <Button leftIcon={<BiEditAlt />} colorScheme="green" size="sm" w="4vw" onClick={() => editTaskOnClick(props.todo_id)}>Edit</Button>
                    <Button leftIcon={<BiTrash />} colorScheme="red" size="sm" w="4vw" onClick={() => deleteTaskOnClick(props.todo_id)}>Delete</Button>
                </Flex>
            </Flex>
        }

        {edit === true && props.finished === 0 &&
            <Flex flexDir="row" alignItems="center" pr="2%" pl="2%" bg="#dfe1e2" w="50vw" minH="5vh" borderRadius="50px" m="2vh">
                <Flex flexDir="row" alignContent="center" w="40vw">
                <Textarea onChange={e =>setUpdatedContent(e.target.value)}
                    fontSize="sm" resize="none" border="none" _focusVisible={false}>
                {props.content}</Textarea>
                        
                </Flex>
                <Flex flexDir="row" justifyContent="space-between" w="12vw">
                    <Button leftIcon={<BiEditAlt />} colorScheme="green" size="sm" w="5vw" onClick={() => editTaskOnClick(props.todo_id)}>Submit</Button>
                    <Button colorScheme="red" size="sm" w="5vw" onClick={() => cancelEditOnClick(props.todo_id)}>Cancel</Button>
                </Flex>
            </Flex>
        }

        {props.finished === 1 &&
           <Flex flexDir="row" alignItems="center" pr="2%" pl="2%" bg="#8B8C8C" w="50vw" minH="5vh" borderRadius="50px" m="2vh">

                <Flex flexDir="row" alignItems="center" w="40vw">
                    <Text fontSize="md" fontWeight="bold" as="del" color="#4D4D4D">{props.content}</Text>
                </Flex>

                <Flex flexDir="row" justifyContent="space-between" w="14vw">
                <Button colorScheme="blue" size="sm" w="8vw" onClick={() => resetFinished(props.todo_id)}>Reset</Button>
                <Button leftIcon={<BiTrash />} colorScheme="red" size="sm" w="4vw" onClick={() => deleteTaskOnClick(props.todo_id)}>Delete</Button>
                </Flex>
            </Flex>
        }
        </>
    );
}