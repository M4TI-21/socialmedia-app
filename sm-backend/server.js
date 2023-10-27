const express = require("express");
const cors = require("cors");
const RegisterModel = require("./models/register");
const app = express();
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    try{
        const {email, pass, name, dob, tag} = req.body;
        const user = await RegisterModel.findOne({email: email})
        if(!user){
            res.json("Created account");
            await RegisterModel.create({
                email: email,
                password: pass,
                name: name,
                date_of_birth: dob,
                tag: tag,
            })
        }
        else{
            res.json({status: "Account already existing"});
        }
    }
    catch(error){
        console.log(error);
    }
})

app.post("/login", async (req, res) => {
    try{
        const {loginEmail, loginPass} = req.body;
        const user = await RegisterModel.findOne({email: loginEmail})
        if(!user){
            res.json({status: "There is no user record with that email"});
        }
        else if(user){
            if(user.password !== loginPass && user.email === loginEmail){
                res.json({status: "Incorrect password"});
            }
            else if(user.password === loginPass && user.email === loginEmail){
                const token = jwt.sign({
                    email: user.email,
                    tag: user.tag
                }, 'secret')
                res.json({status: "User logged", user: token});
            }
        }
        
    }
    catch(error){
        console.log(error)
    }
})

app.get("/main", async (req, res) => {
    const token = req.headers["x-access-token"];
    try{
        const decoded = jwt.verify(token, "secret");
        const email = decoded.email;
        const user = await RegisterModel.findOne({email: email});
        return res.json({ status: "Data fetched successfully", name: user.name, post: user.post})
    }
    catch(error){
        console.log(error);
        res.json({status: "Invalid token"});
    }
})

app.listen(8080, (req, res) => {
    console.log("Listening");
});