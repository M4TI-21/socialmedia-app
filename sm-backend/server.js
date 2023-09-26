const express = require("express");
const mysql = require("mysql");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db_connect = mysql.createConnection({
    host: "localhost",
    user: "rott",
    pass: "",
    database: "blog_db"
})

app.get("/", (req, resp) => {
    resp.send("dziala")
})

app.post("/register",(req, res) => {
    const values = [
        req.body.email,
        req.body.pass,
    ]
    const query = "INSERT INTO user_login (`email`, `password`) VALUES (?,?)";

    db_connect.query(query, [values], (err, response) => {
        if(err){
            return res.json({error: "nie git"});
        } 
        else{
            return res.json({status: "git"})
        }
       
    })
})

app.listen(8080, ()=> {
    console.log("slucham!!!");
})