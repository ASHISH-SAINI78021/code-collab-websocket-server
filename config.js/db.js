const mongoose = require("mongoose");


async function main(){
    try {
        await mongoose.connect(process.env.URL);
    } catch (err) {
        console.log(err.bgCyan.white);
    }
}

module.exports = main;