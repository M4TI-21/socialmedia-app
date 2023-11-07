const mysql =  require("mysql");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

//connect to database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    pass: "",
    database: "note_app_db"
})

//insert register data to db
app.post("/register", async (req, res) => {
    try{
        const {email, name, tag, dob, pass} = req.body;
        const values = [email, name, tag, dob, pass];
        await db.query("SELECT email FROM user_data WHERE email = ?", email, (error, data) => {
            if(error){
                res.json({status: error});
            }
            if(data.length > 0){
                res.json({status: "Account already existing"});
            }
            else{
                res.json("Created account");
                db.query("INSERT INTO user_data (email, name, tag, date_of_birth, password) VALUES (?)", [values]);
            }
        })
    }
    catch(error){
        console.log(error);
    }
})

//login using existing data
app.post("/login", async (req, res) => {
    try{
        const {loginEmail, loginPass} = req.body;
        await db.query("SELECT email, password, tag FROM user_data WHERE email = ?", loginEmail, (error, data) => {
            if(error){
                res.json({status: error});
            }
            if(data.length > 0){
                if(data[0].email === loginEmail && data[0].password !== loginPass){
                    res.json({status: "Incorrect password"});
                }
                else if(data[0].email === loginEmail && data[0].password ===loginPass){
                    const token = jwt.sign({
                        email: data[0].email,
                        tag: data[0].tag
                    }, 'secret')
                    res.json({status: "User logged", user: token});
                }
            }
            else{
                res.json({status: "There is no user record with that email"});
            }
        })
    }
    catch(error){
        console.log(error)
    }
})

//fetch logged user data
app.get("/main", async (req, res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        await db.query("SELECT * FROM user_data WHERE email = ?", email, (error, data) => {
            if(error){
                res.json({status: error});
            }
            else{
                res.json({ status: "Data fetched successfully",
                user_id: data[0].user_id,
                email: data[0].email,
                name: data[0].name,
                tag: data[0].tag,
                date_of_birth: data[0].date_of_birth})
            }
        })
    }
    catch(error){
        console.log(error);
        res.json({status: "Invalid token"});
    }
})

//create note
app.post("/main", async (req, res) => {
    const dateNow = new Date();
    const dateValue = dateNow.toISOString().split('T')[0] + ' ' + dateNow.toTimeString().split(' ')[0];

    const values = [req.body.email, "Title", "Enter your note", dateValue, dateValue];
    try{
        await db.query("INSERT INTO notes (user_email, title, content, creation_date, update_date) VALUES (?)", [values]);
        res.json({status: "Note created successfully"});
    }
    catch(error){
        console.log(error);
    }
})

//fetch notes for user
app.get("/main", async (req,res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        await db.query("SELECT * FROM notes WHERE user_email = ?", email, (error, data) => {
            if(error){
                res.json({status: error});
            }
            else{
                res.json({ status: "Data fetched successfully"})
            }
        })
    }
    catch(error){
        console.log(error);
        res.json({status: "Invalid token"});
    }
})

app.listen(8080, (req, res) => {
    console.log("Listening");
});