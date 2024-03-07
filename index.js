// packages
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const authRoute = require("./routes/authRoute.js");


// self-built packages
const app = express();
const main = require("./config.js/db.js");


// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


main()
.then(()=> {
    console.log(`connected to database`.bgRed.white);
})
.catch((err)=> {
    console.log(`${err}`.bgCyan.white);
})



// rest api
app.get("/" , (req , res)=> {
    res.send({message : "Welcome to ecommerce app"});
})

app.use("/api/v1/auth" , authRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT , ()=> {
    console.log(`App is listening on ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
})