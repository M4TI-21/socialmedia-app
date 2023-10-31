const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/socialmedia")
.then(() => {
    console.log("Database connected");
})
.catch(() => {
    console.log("Database was not connected successfully");
})

const User = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
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
        type: String,
        required: true
    },

}, {collection: 'user-data'})

const UserDataModel = mongoose.model("UserData", User);
module.exports = UserDataModel;