const bcrypt = require("bcrypt");

const hashPassword = async(password)=> {
    try {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(password , saltRounds);
        return hashed;
    } catch (err) {
        console.log(`${err}`.bgCyan.white);
    }
}

module.exports = hashPassword;