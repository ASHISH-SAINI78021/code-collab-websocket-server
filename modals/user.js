const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    email : {
        type : String ,
        unique : true
    } ,
    password : {
        type : String ,
        required : true ,
        trim : true
    } ,
    answer : {
        type : String ,
        required : true
    } 
} , {timestamps : true});

const User = mongoose.model("User" , userSchema);
module.exports = User;