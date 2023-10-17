const express = require("express");
const cors = require("cors");
const RegisterModel = require("./models/register");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", cors(), (req, res) => {
    res.send("dziala")
})

app.listen(8080, ()=> {
    console.log("Listening");
})

app.post("/register", (req, res) => {
    const {email, pass, name, dob, tag} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(!user){
            res.json("Created account");
            RegisterModel.create({email: email, password: pass, name: name, date_of_birth: dob, tag: tag})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
        else{
            res.json("Account already existing");
        }
    }).catch(err => res.json(err))
})

app.post("/login", (req, res) => {
    const {loginEmail, loginPass} = req.body;
    RegisterModel.findOne({email: loginEmail})
    .then(user => {
        if(user){
            if(user.password === loginPass && user.email === loginEmail){
                res.json("User logged");
            }
            else if(user.password !== loginPass && user.email === loginEmail){
                res.json("Incorrect password");
            }
        }
        else{
            res.json("There is no user record with that email");
        }
    }).catch(err => res.json(err))
})