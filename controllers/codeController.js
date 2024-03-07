const Code = require("../modals/code.js");


module.exports.saveCode = async(req , res)=> {
    try {
        const {fileName , language , code} = req.body;
        if (!fileName){
            return res.send({
                success : false ,
                message : "Filename is required"
            })
        }
        if (!language){
            return res.send({
                success : false ,
                message : "Language is required"
            })
        }
        if (!code){
            return res.send({
                success : false ,
                message : "Code is required"
            })
        }

        const newCode = new Code({
            fileName , language , code
        })
        await newCode.save();

        return res.send({
            success : true ,
            message : "Code saved successfuly" ,
            newCode
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Code not saved" ,
            err
        })
    }
}