const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    tag: String,
    date_of_birth: Date
})

const RegisterModel = mongoose.model("register", RegisterSchema);
module.exports = RegisterModel;