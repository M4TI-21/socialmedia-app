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

app.listen(8080, (req, res) => {
    console.log("Listening");
});

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
app.get("/main/user", async (req, res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        await db.query("SELECT * FROM user_data WHERE email = ?", [email], (error, data) => {
            if(error){
                res.json({status: error});
            }
            else{
                return res.json(data[0]);
            }
        })
    }
    catch(error){
        console.log(error);
        res.json({status: "Invalid token"});
    }
})

//create note
app.post("/main/createnote", async (req, res) => {
    const dateNow = new Date();
    const dateValue = dateNow.toISOString().split('T')[0] + ' ' + dateNow.toTimeString().split(' ')[0];
    const values = [req.body.email, req.body.title, req.body.content, dateValue, dateValue, req.body.type, false];
    try{
        await db.query("INSERT INTO notes (user_email, title, content, creation_date, update_date, type, favorite) VALUES (?)", [values]);
        res.json({status: "Note created successfully"});
    }
    catch(error){
        console.log(error);
    }
})

//fetch basic notes
app.get("/main/basicnotes", async (req, res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        const type = "Basic Note";
        await db.query("SELECT * FROM notes WHERE user_email = ? AND type = ?", [email, type], (error, data) => {
            if(error){
                res.json({status: error});
            }
            else{
                return res.json(data);
            }
        })
    }
    catch(error){
        console.log(error);
        res.json({status: "Invalid token"});
    }
})


//fetch todo notes
app.get("/main/basicnotes", async (req, res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        const type = "Todo Note";
        await db.query("SELECT * FROM notes WHERE user_email = ? AND type = ?", [email, type], (error, data) => {
            if(error){
                res.json({status: error});
            }
            else{
                return res.json(data);
            }
        })
    }
    catch(error){
        console.log(error);
        res.json({status: "Invalid token"});
    }
})

//delete note
app.delete("/main/deletenote/:id", async (req, res) => {
    const id = req.body.noteID;
    try{
        await db.query("DELETE FROM notes WHERE note_id = ?", [id], (error, data) => {
            if(error){
                res.json({status: error});
            }
            else{
                return res.json({status: "Note created successfully"});
            }
        })
    }
    catch(error){
        console.log(error);
        res.json({status: "Invalid token"});
    }
})

//edit note
app.put("/main/editnote/:id", async (req, res) => {
    const id = req.body.noteID;
    const title = req.body.title;
    const content = req.body.content;
    const dateNow = new Date();
    const dateValue = dateNow.toISOString().split('T')[0] + ' ' + dateNow.toTimeString().split(' ')[0];

    try{
        await db.query("UPDATE notes SET title = ?, content = ?, update_date = ? WHERE note_id = ?", [title, content, dateValue, id], (error, data) => {
            if(error){
                res.json({status: error});
            }
            else{
                return res.json({status: "Note updated successfully"});
            }
        })
    }
    catch(error){
        console.log(error);
    }
})

//add to favorites
app.put("/main/addfav/:id", async (req, res) => {
    const id = req.body.noteID;
    try{
        await db.query("UPDATE notes SET favorite = ? WHERE note_id = ?", [true, id], (error, data) => {
            if(error){
                res.json({status: error});
            }
            else{
                return res.json();
            }
        })
    }
    catch(error){
        console.log(error);
    }
})

//delete from favorites
app.put("/main/deletefav/:id", async (req, res) => {
    const id = req.body.noteID;
    try{
        await db.query("UPDATE notes SET favorite = ? WHERE note_id = ?", [false, id], (error, data) => {
            if(error){
                res.json({status: error});
            }
            else{
                return res.json();
            }
        })
    }
    catch(error){
        console.log(error);
    }
})
