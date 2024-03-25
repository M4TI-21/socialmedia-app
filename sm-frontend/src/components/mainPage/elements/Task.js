import axios from "axios";
import { Text, Flex, Textarea, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon, RepeatIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from "react";
import moment from 'moment';

export default function Task(props) {
    const [edit, setEdit] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(props.content);
    const fullDueDate = moment(props.due_date).format("DD MMM YYYY HH:mm")

    const dueDate = moment(props.due_date).format("YYYY, MM, DD");
    const dueTime = moment(props.due_date).format("HH:mm");
    const dateNow = moment(Date.now()).format("YYYY, MM, DD");
    const timeNow = moment(Date.now()).format("HH:mm");

    const deleteTask = async (id) => {
        const taskID = id;
        axios.delete(`http://localhost:8080/main/deletetask/${taskID}`, 
        {
            data: {taskID: taskID}
        })
        .then((res) => {
            props.fetchTodoTasks();
            props.setShowDeleteAlert(true);
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
            props.fetchTodoTasks();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <>
        {edit === false && props.finished === 0 &&
            <Flex flexDir="row" alignItems="center" pr="2%" pl="2%" bg="#dfe1e2" w="50vw" minH="5vh" borderRadius="10px" m="2vh">
                
                <Flex flexDir="row" justifyContent="space-between" w="40vw" mr="1vw">
                    <Text fontSize="md" fontWeight="bold" mt="auto" mb="auto" w="25vw">{props.content}</Text>
                    {props.due_date != null && ((dueDate > dateNow && dueTime > timeNow) || (dueDate === dateNow && dueTime > timeNow)) && 
                        <Text fontSize="sm" mt="auto" mb="auto">Due: {fullDueDate}</Text>}
                        
                    {props.due_date != null && ((dueDate < dateNow) || (dueDate === dateNow && dueTime < timeNow)) &&
                        <Text fontSize="sm" mt="auto" mb="auto" color="red" fontWeight="bold">Due: {fullDueDate}</Text>}
                </Flex>

                <Flex flexDir="row" justifyContent="space-between" w="10vw">
                    <IconButton icon={<CheckIcon />} colorScheme="blue" size="md" onClick={() => setFinished(props.todo_id)}/>
                    <IconButton icon={<EditIcon />} colorScheme="yellow" size="md" onClick={() => editTaskOnClick(props.todo_id)}/>
                    <IconButton icon={<DeleteIcon />} colorScheme="red" size="md" onClick={() => deleteTaskOnClick(props.todo_id)}/>
                </Flex>
            </Flex>
        }

        {edit === true && props.finished === 0 &&
            <Flex flexDir="row" alignItems="center" pr="2%" pl="2%" bg="#dfe1e2" w="50vw" minH="3vh" borderRadius="10px" m="2vh">
                <Flex flexDir="row" alignContent="center" w="40vw">
                <Textarea onChange={e =>setUpdatedContent(e.target.value)} w="30vw"
                    fontSize="md" resize="none" border="none" _focusVisible={false}>
                {props.content}</Textarea>
                        
                </Flex>
                <Flex flexDir="row" justifyContent="space-between" w="10vw">
                    <IconButton icon={<CheckIcon />} colorScheme="yellow" size="md" onClick={() => editTaskOnClick(props.todo_id)}/>
                    <IconButton icon={<CloseIcon />} colorScheme="red" size="md" onClick={() => cancelEditOnClick(props.todo_id)}/>
                </Flex>
            </Flex>
        }

        {props.finished === 1 &&
           <Flex flexDir="row" alignItems="center" pr="2%" pl="2%" bg="#8B8C8C" w="50vw" minH="5vh" borderRadius="10px" m="2vh">

                <Flex flexDir="row" alignItems="center" w="41vw">
                    <Text fontSize="md" fontWeight="bold" as="del" color="#4D4D4D" w="25vw">{props.content}</Text>
                </Flex>

                <Flex flexDir="row" justifyContent="space-between" w="10vw">
                    <IconButton icon={<RepeatIcon />} colorScheme="blue" size="md"  onClick={() => resetFinished(props.todo_id)}/>
                    <IconButton icon={<DeleteIcon />} colorScheme="red" size="md" onClick={() => deleteTaskOnClick(props.todo_id)}/>
                </Flex>
            </Flex>
        }
        </>
    );
}