const JWT = require("jsonwebtoken");
const User = require("../modals/user.js");

module.exports.isLoggedIn = (req , res , next)=> {
    try {
        const decode = JWT.verify(req.headers.authorization , process.env.JWT_TOKEN);
        req.user = decode;
        next();
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}


// admin route
module.exports.isAdmin = async(req , res , next)=> {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1){
            return res.send({
                success : false ,
                message : "You are not admin"
            })
        }
        else {
            next();
        }
    } catch (err) {
        return res.send({
            success : false ,
            message : "Error occurred" ,
            err
        })
    }
}