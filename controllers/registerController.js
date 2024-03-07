const User = require("../modals/user.js");
const hashPassword = require("../helper/register.js");
const compare = require("../helper/login.js");
const JWT = require("jsonwebtoken");

module.exports.registerController = async(req , res)=> {
    try {
        const {email , password , answer} = req.body;
        if (!email){
            return res.send({
                success : false ,
                message : "Email field is required"
            })
        }
        if (!password){
            return res.send({
                success : false ,
                message : "Password field is required"
            })
        }
        if (!answer){
            return res.send({
                success : false ,
                message : "Answer field is required"
            })
        }

        const existingUser = await User.findOne({email : email});
        if (existingUser) {
            return res.send({
                success : false ,
                message : "User is already registered"
            })
        }

        // new user 
        const hashedAnswer = await hashPassword(answer);
        const hashed = await hashPassword(password);
        const user = new User({
            email , password : hashed , answer: hashedAnswer
        })

        await user.save({ writeConcern: { w: 'majority' } });
        return res.send({
            success : true ,
            message : "registered successfuly"
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "error in registeration" ,
            err
        })
    }
}


// login || POST
module.exports.loginController = async(req , res)=> {
    try {
        const {email , password} = req.body;

        // validations 
        if (!email){
            return res.send({
                success : false ,
                message : "Email field is required"
            })
        }
        if (!password){
            return res.send({
                success : false ,
                message : "Password field is required"
            })
        }
        const user = await User.findOne({email : email});
        if (!user){
            return res.send({
                success : false ,
                message : "User not exist"
            })
        }
        
        // it means user exists
        const exists = await compare(password , user.password);

        if (!exists){
            return res.send({
                success : false ,
                message : "Either email or password is incorrect"
            })
        }

        // it means user exists
        const token = await JWT.sign({_id : user._id} , process.env.JWT_TOKEN , {
            expiresIn : "7d"
        });
        return res.send({
            success : true ,
            message : "Successfuly login" ,
            user : {
                email : user.email ,
            } , 
            token
        })

    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Login has failed" ,
            err
        })
    }
}

// forgot password controller || POST
module.exports.forgotpasswordController = async(req , res)=> {
    try {
        const {email , answer , newPassword} = req.body;
        // validations
        if (!email){
            return res.send({
                success : false ,
                message : "Email is required"
            })
        }
        if (!answer){
            return res.send({
                success : false ,
                message : "Answer is required"
            })
        }
        if (!newPassword){
            return res.send({
                success : false ,
                message : "Password is required"
            })
        }

        const user = await User.findOne({email : email});
        if (!user){
            return res.json({
                success : false ,
                message : "User is not defined"
            })
        }

        const exists = await compare(answer , user.answer);

        if (!exists){
            return res.send({
                success : false ,
                message : "Answer not matched"
            })
        }

        // it means user exists
        const hashed = await hashPassword(newPassword);
        user = await User.updateOne({email : email} , {$set : {
            password : hashed
        }});

        return res.send({
            success : true ,
            message :"Password changed successfully"
        })
    } catch (err) {
        console.log(err);
        return res.send({
            success : false ,
            message : "Error in forgot password controller" ,
            err
        })
    }
}