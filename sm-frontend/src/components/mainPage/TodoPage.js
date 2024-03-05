import Task from "./elements/Task";
import "./mainPageStyle.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Flex, OrderedList, Input, Button, Textarea, Text } from "@chakra-ui/react";

export default function TodoPage(props) {
  const [tasks, setTasks] = useState([]);
  const [todoContent, setTodoContent] = useState("");
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState([])

    const fetchTodoTasks = async () => {
        axios.get("http://localhost:8080/main/notes/fetch_todo_tasks", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            setTasks(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const fetchSearchedTasks = async () => {
        axios.post("http://localhost:8080/main/searchtasks", {
          search,
          headers: {"x-access-token": localStorage.getItem("token")}
        })
        .then((res) => {
          setTasks(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    
    useEffect(() =>{
    if(search === ""){
        fetchTodoTasks();
    }
    else{
        fetchSearchedTasks();
    }
    }, [search])

    const taskValidation = () => {
        let error = {};

        if(todoContent === ""){
            error.todoContent = "Task cannot be empty"
        }
        else{
            error.todoContent = "";
        }

        return error;
    }

    const createTodoTask = async () => {
        const content = todoContent;
        const email = props.email;
        axios.put(`http://localhost:8080/main/inserttodo/`, {
            email,
            content, 
            headers: {"x-access-token": localStorage.getItem("token")}
        })
        .then((res) => {
            fetchTodoTasks();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const addTask = (e) => {
        e.preventDefault();
        const error = taskValidation(todoContent);
        setErrorMsg(error);

        if(error.todoContent !== ""){
            console.log("Error");
        }
        else{
            createTodoTask(); 
        }
    }

  return (
    <>
    <Flex flexDir="column" alignItems="center" w="100%">
        <Flex flexDir="row" w="100%">
            <Input onChange={(e) => {setSearch(e.target.value)}} type="text" mb="4vh" placeholder="Search task..." border="1px solid #bbb" borderRadius="20px" w="40vw" ml="30%"/>
        </Flex>
        {errorMsg.todoContent && 
            <Flex bg="#ffbaba" border="1px" borderColor="#a70000" w="15%" h="4vh" borderRadius="10px" justifyContent="center" mb="1%">
                <Text color="#a70000" fontWeight="bold" fontSize="large" mt="auto" mb="auto">{errorMsg.todoContent}</Text>
            </Flex>
        }
        <Flex flexDir="row" alignItems="center" justifyContent="space-between" mb="4vh" w="25%">
            <Textarea onChange={e => setTodoContent(e.target.value)} type="text" placeholder="Create new task" border="1px solid #bbb" borderRadius="20px" w="20vw" h="5vh" resize="none"/>
            <Button onClick={addTask} >Submit</Button>
        </Flex>
        

    <OrderedList alignItems="center">
        {tasks.map(e => (
            <Task key={e.todo_id} content={e.todo_content} finished={e.finished} todo_id={e.todo_id} fetchTodoTasks={fetchTodoTasks}/>
        ))} 
    </OrderedList>
        
    </Flex>
    </>
  );
}