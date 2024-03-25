import Task from "./elements/Task";
import "./mainPageStyle.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Flex, OrderedList, Input, Button, Text, InputGroup, InputLeftAddon, RadioGroup, Radio, Stack, Box, Alert, AlertTitle, AlertIcon, Textarea } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'

export default function TodoPage(props) {
  const [tasks, setTasks] = useState([]);
  const [todoContent, setTodoContent] = useState("");
  const [todoDate, setTodoDate] = useState();
  const [checked, setChecked] = useState("noDate");
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const timerId = useRef(null)

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
            error.todoContent = "Input your task content"
        }
        else{
            error.todoContent = "";
        }

        return error;
    }

    const createTodoTask = async (date) => {
        const content = todoContent;
        const email = props.email;
        const todoDate = date
        axios.put(`http://localhost:8080/main/inserttodo/`, {
            email,
            content, 
            todoDate,
            headers: {"x-access-token": localStorage.getItem("token")}
        })
        .then((res) => {
            fetchTodoTasks();
            setShowCreateAlert(true)
            setTodoContent("")
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
            if(checked === "noDate"){
                createTodoTask(null); 
            }
            else if(checked === "setDate"){
                createTodoTask(todoDate.replace("T", " ")); 
            }
            
        }
    }

    const datetimeStyle = {
        width: "8vw",
        marginRight: "3vw"
    }

    useEffect(() => {
        if(showDeleteAlert || showCreateAlert){
          timerId.current = setTimeout(() => {
            setShowDeleteAlert(false);
            setShowCreateAlert(false);
          }, 2000);
        }
        return () => {
          clearTimeout(timerId.current);
        };
      }, [showDeleteAlert, showCreateAlert]);

  return (
    <>
    <Flex flexDir="column" alignItems="center" w="100%">
        <InputGroup justifyContent="center">
            <InputLeftAddon>
            <SearchIcon />
            </InputLeftAddon>
            <Input onChange={(e) => {setSearch(e.target.value)}} type="text" mb="4vh" placeholder="Search task..." w="40vw"/>
        </InputGroup>

        <Flex flexDir="row" bg="#dfe1e2" borderRadius="10px" w="50vw" ml="3%" pr="1%" pl="1%" alignItems="center">
            <Textarea onChange={e => setTodoContent(e.target.value)} type="text" placeholder="Create new task" border="none" _focusVisible={false}
            borderRadius="10px" maxH="5vh" w="20vw" maxLength="50" resize="none" overflow="hidden"/>
            
            <RadioGroup defaultValue="noDate" w="10vw" ml="2vw">
                <Stack direction="column">
                    <Radio value="setDate" checked={checked === "setDate"} colorScheme="blackAlpha" onChange={e => setChecked(e.target.value)}>Set deadline</Radio>
                    <Radio value="noDate" checked={checked === "noDate"} colorScheme="blackAlpha" onChange={e => setChecked(e.target.value)}>No deadline</Radio>
                </Stack>
            </RadioGroup>
            
            {checked === "setDate" &&
               <input type="datetime-local" style={datetimeStyle} onChange={e => setTodoDate(e.target.value)}/>         
            }
            {checked === "noDate" &&
                <Box bg="blue" w="11vw"></Box>
            }
            <Button onClick={addTask} bg="#333" color='white' _hover={{ bg: "#555"}}>Submit</Button>
        </Flex>
        {errorMsg.todoContent && <Text color="red" fontWeight="" fontSize="small">*{errorMsg.todoContent}</Text>}


        <OrderedList alignItems="center">
            {tasks.map(e => (
                <Task key={e.todo_id} content={e.todo_content} finished={e.finished} todo_id={e.todo_id} due_date={e.due_date} fetchTodoTasks={fetchTodoTasks} 
                setShowDeleteAlert={setShowDeleteAlert}/>
            ))} 
        </OrderedList>
        
        {showDeleteAlert === true &&
        <Alert status="success" position="fixed" w="30vw" minH="7vh" right="0" bottom="0">
          <AlertIcon />
          <Flex justifyContent="center" alignItems="center" flexDir="column" ml="2vw" w="100%">
            <AlertTitle textAlign="center" fontSize="large">Task successfully deleted!</AlertTitle>
          </Flex>
        </Alert>
      }

      {showCreateAlert === true &&
        <Alert status="success" position="fixed" w="30vw" minH="7vh" right="0" bottom="0">
          <AlertIcon />
          <Flex justifyContent="center" alignItems="center" flexDir="column" ml="2vw" w="100%">
            <AlertTitle textAlign="center" fontSize="large">Task successfully created!</AlertTitle>
          </Flex>
        </Alert>
      }
    </Flex>
    </>
  );
}