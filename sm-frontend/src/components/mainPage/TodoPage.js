import Task from "./elements/Task";
import "./mainPageStyle.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Flex, OrderedList, Input, Button, Textarea, Text, InputGroup, InputLeftAddon, RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'

export default function TodoPage(props) {
  const [tasks, setTasks] = useState([]);
  const [todoContent, setTodoContent] = useState("");
  const [todoDate, setTodoDate] = useState()
  const [dateRadio, setDateRadio] = useState(false)
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

    const datetimeStyle = {
        width: "8vw",
    }

  return (
    <>
    <Flex flexDir="column" alignItems="center" w="100%">
        <Flex>
        <InputGroup>
            <InputLeftAddon>
            <SearchIcon />
            </InputLeftAddon>
            <Input onChange={(e) => {setSearch(e.target.value)}} type="text" mb="4vh" placeholder="Search task..." w="40vw"/>
        </InputGroup>
        </Flex>
        {errorMsg.todoContent && 
            <Flex bg="#ffbaba" border="1px" borderColor="#a70000" w="15%" h="4vh" borderRadius="10px" justifyContent="center" mb="1%">
                <Text color="#a70000" fontWeight="bold" fontSize="large" mt="auto" mb="auto">{errorMsg.todoContent}</Text>
            </Flex>
        }
        <Flex flexDir="row" alignItems="center" justifyContent="space-between" mb="4vh" minW="30vw" bg="red">
            <Textarea onChange={e => setTodoContent(e.target.value)} type="text" placeholder="Create new task" border="1px solid #bbb" borderRadius="20px" w="20vw" h="5vh" resize="none"/>
            
            <RadioGroup defaultValue="noDate">
                <Stack direction="column">
                    <Radio checked={setDateRadio(true)}>Set deadline</Radio>
                    <Radio >No deadline</Radio>
                </Stack>
            </RadioGroup>
            
            {dateRadio === true &&
               <input type="datetime-local" style={datetimeStyle}/>         
            }
            <Button onClick={addTask}>Submit</Button>
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