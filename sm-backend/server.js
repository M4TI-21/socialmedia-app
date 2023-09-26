const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const RegisterModel = require("./models/register");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/socialmedia")

app.get("/", (req, resp) => {
    resp.send("dziala")
})

app.post("/register", (req, res) => {
    const {email, pass, name, dob, tag} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user){
            res.join("Account already existing")
        }
        else{
            RegisterModel.create({email: email, password: pass, name: name, date_of_birth: dob, tag: tag})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

app.listen(8080, ()=> {
    console.log("Listening");
})