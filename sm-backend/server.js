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
    database: "note_app"
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
                db.query("INSERT INTO user_data (email, name, tag, date_of_birth, pass) VALUES (?)", [values]);
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
        await db.query("SELECT email, pass FROM user_data WHERE email = ?", loginEmail, (error, data) => {
            if(error){
                res.json({status: error});
            }
            if(data.length > 0){
                if(data[0].email === loginEmail && data[0].pass !== loginPass){
                    res.json({status: "Incorrect password"});
                }
                else if(data[0].email === loginEmail && data[0].pass ===loginPass){
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

//NOTES QUERIES

//create note
app.post("/main/createnote", async (req, res) => {
    const dateNow = new Date();
    const dateValue = dateNow.toISOString().split('T')[0] + ' ' + dateNow.toTimeString().split(' ')[0];
    const noteColors = ['#ff7eb9', "#ff65a3", "#7afcff", "#feff9c", "#fff740", "#e4a8b9", "#e4eeff", "#cdfc93", "#ffc14a", "#46c45a"];
    const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];

    const values = [req.body.email, req.body.title, req.body.content, dateValue, dateValue, false, randomColor];
    try{
        await db.query("INSERT INTO notes (user_email, title, content, creation_date, update_date, favorite, color) VALUES (?)", [values]);
        res.json({status: "Note created successfully"});
    }
    catch(error){
        console.log(error);
    }
})

//fetch notes
app.get("/main/notes/fetch_date_desc", async (req, res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        await db.query("SELECT * FROM notes WHERE user_email = ? ORDER BY update_date DESC", [email], (error, data) => {
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
                return res.json(data);
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
    const color = req.body.color;

    try{
        await db.query("UPDATE notes SET title = ?, content = ?, update_date = ?, color = ? WHERE note_id = ?", [title, content, dateValue, color, id], (error, data) => {
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
    }
})

//set favorite
app.put("/main/setfavorite/:id", async (req, res) => {
    const id = req.body.noteID;
    try{
        await db.query("UPDATE notes SET favorite = ? WHERE note_id = ?", [1, id], (error, data) => {
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
    }
})

//unset favorite
app.put("/main/unsetfavorite/:id", async (req, res) => {
    const id = req.body.noteID;
    try{
        await db.query("UPDATE notes SET favorite = ? WHERE note_id = ?", [0, id], (error, data) => {
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
    }
})

//fetch favorite notes
app.get("/main/notes/fetch_fav", async (req, res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        await db.query("SELECT * FROM notes WHERE user_email = ? AND favorite = ? ORDER BY update_date DESC", [email, true], (error, data) => {
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

//note search
app.post("/main/searchnotes", async (req, res) => {
    const token = req.body.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        const search = req.body.search;
        await db.query("SELECT * FROM notes WHERE user_email = ? AND content LIKE ? OR title LIKE ? ORDER BY update_date DESC", [email, '%'+search+'%', '%'+search+'%'], (error, data) => {
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

//fetch note bookmarks
app.get("/main/notes/bookmarks", async (req, res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        await db.query("SELECT * FROM bookmarks WHERE bm_email = ?", [email], (error, data) => {
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

//set bookmark
app.put("/main/addbookmark/:id", async (req, res) => {
    const id = req.body.noteID;
    const bookmark = req.body.bookmark;
    try{
        await db.query("UPDATE notes SET bookmark = ? WHERE note_id = ?", [bookmark, id], (error, data) => {
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
    }
})

//fetch notes with bookmark
app.get("/main/notes/fetch_note_group", async (req, res) => {
    const token = req.headers["x-access-token"];
    const bookmark = req.body.bookmark
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        await db.query("SELECT * FROM notes WHERE user_email = ? AND bookmark = ? ORDER BY update_date DESC", [email, bookmark], (error, data) => {
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

//TASKS QUERIES

//create tasks
app.put("/main/inserttodo", async (req, res) => {
    const content = req.body.content;
    const email = req.body.email;
    const values = [email, content, 0];
    try{
        await db.query("INSERT INTO todo (user_email, todo_content, finished) VALUES (?)", [values] , (error, data) => {
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
    }
})

//delete task
app.delete("/main/deletetask/:id", async (req, res) => {
    const id = req.body.taskID;
    try{
        await db.query("DELETE FROM todo WHERE todo_id = ?", [id], (error, data) => {
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

//fetch todo tasks
app.get("/main/notes/fetch_todo_tasks", async (req, res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        await db.query("SELECT * FROM todo WHERE user_email = ?", [email], (error, data) => {
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

//edit task
app.put("/main/edittask/:id", async (req, res) => {
    const id = req.body.taskID;
    const content = req.body.content;

    try{
        await db.query("UPDATE todo SET todo_content = ? WHERE todo_id = ?", [content, id], (error, data) => {
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
    }
})

//task search
app.post("/main/searchtasks", async (req, res) => {
    const token = req.body.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        const search = req.body.search;
        await db.query("SELECT * FROM todo WHERE user_email = ? AND todo_content LIKE ?", [email, '%'+search+'%'], (error, data) => {
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


//complete task
app.put("/main/completetask/:id", async (req, res) => {
    const id = req.body.taskID;
    const isFinished = req.body.finished;
    try{
        await db.query("UPDATE todo SET finished = ? WHERE todo_id = ?", [isFinished, id], (error, data) => {
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
    }
})