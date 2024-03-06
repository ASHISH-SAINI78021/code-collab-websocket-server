const bcrypt = require("bcrypt");

const compare = async(password , hashed)=> {
    return await bcrypt.compare(password , hashed);
}

module.exports = compare;