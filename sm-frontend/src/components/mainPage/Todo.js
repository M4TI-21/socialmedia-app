import MainNavComp from "./elements/MainNavbar";
import Task from "./Task";
import "./mainPageStyle.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Flex, OrderedList, Input, Button } from "@chakra-ui/react";

export default function Todo() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState([]);
  const [todoContent, setTodoContent] = useState("");
  const [search, setSearch] = useState("");

    const populateMainData = () => {
        axios.get("http://localhost:8080/main/user", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
        })
        .then((res) => {
        setEmail(res.data.email);
        })
        .catch((err) => {
        console.log(err);
        })
    }
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
        const user = jwt_decode(token);
        if(!user){
            localStorage.removeItem("token");
            navigate("/");
        }
        else{
            populateMainData();
        }
        }
    })

    const logOut = () => {
        console.log("logout")
        localStorage.removeItem("token");
    }

    const fetchTodoTasks = async () => {
        axios.get("http://localhost:8080/main/notes/fetch_todo_tasks", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            setTasks(res.data);
            console.log(tasks)
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

    const createTodoTasks = async () => {
        const content = todoContent;
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

  return (
    <div className="mainPage d-flex flex-column align-items-center">
        <div className="topPage">
            <MainNavComp logOut={logOut}/>
        </div>
        <Flex flexDir="column" alignItems="center" w="100%">
        <Input onChange={(e) => {setSearch(e.target.value)}} type="text" mb="4vh" placeholder="Search task..." border="1px solid #bbb" borderRadius="20px" w="40vw"/>
        <Flex flexDir="row">
            <Input type="text" mb="4vh" placeholder="Create new task" border="1px solid #bbb" borderRadius="20px" w="20vw" />
            <Button>Submit</Button>
        </Flex>
        

        <OrderedList alignItems="center">
            {tasks.map(e => (
                <Task key={e.todo_id} content={e.todo_content} finished={e.finished} todo_id={e.todo_id} fetchTodoTasks={fetchTodoTasks}/>
            ))} 
        </OrderedList>
            
        </Flex>
    </div>
  );
}