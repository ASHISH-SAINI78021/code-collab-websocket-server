const mongoose = require("mongoose");
const {Schema} = mongoose;

const codeSchema = new Schema({
    fileName : {
        type : String ,
        required : true ,
        trim : true
    } ,
    language: {
        type : String ,
        required : true
    } ,
    code : {
        type : String
    }
} , {timestamps : true});

const Code = mongoose.model("Code" , codeSchema);
module.exports = Code;