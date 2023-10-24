const express = require("express");
const cors = require("cors");
const RegisterModel = require("./models/register");
const app = express();
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

app.get("/main", cors(), (req, res) => {
    res.send("Strona główna");
});

app.listen(8080, (req, res) => {
    console.log("Listening");
});

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
            res.json({status: error, error: "Account already existing"});
        }
    }).catch(err => res.json(err))
})

app.post("/login", (req, res) => {
    const {loginEmail, loginPass} = req.body;
    RegisterModel.findOne({email: loginEmail})
    .then(user => {
        if(user){
            if(user.password === loginPass && user.email === loginEmail){
                const token = jwt.sign({
                    email: user.email,
                    tag: user.tag
                }, 'secret')
                res.json({status: "User logged", user: token});
            }
            else if(user.password !== loginPass && user.email === loginEmail){
                res.json({status: error, error: "Incorrect password"});
            }
        }
        else{
            res.json({status: error, error: "There is no user record with that email"});
        }
    }).catch(err => res.json(err))
})