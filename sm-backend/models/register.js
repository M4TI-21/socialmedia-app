const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/socialmedia")
.then(() => {
    console.log("Databse connected");
})
.catch(() => {
    console.log("Databse was not connected successfully");
})

const RegisterSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    tag:{
        type: String,
        required: true
    },
    
    date_of_birth:{
        type: Date,
        required: true
    }
})

const UserDataModel = mongoose.model("user-data", RegisterSchema);
module.exports = UserDataModel;