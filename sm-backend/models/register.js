const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    tag: String,
    date_of_birth: Date
})

const UserDataModel = mongoose.model("user-data", RegisterSchema);
module.exports = UserDataModel;