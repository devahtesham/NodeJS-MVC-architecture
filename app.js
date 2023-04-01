const express = require("express");
const mongoose = require("mongoose");


const app = express();
const cors = require("cors");
const router = require("./routes/routes");

// Initialize .env file
require('dotenv').config()

const PORT = process.env.PORT || 5000;
const BASE_URI = `mongodb+srv://devahtesham:devahtesham@cluster0.tjplgan.mongodb.net/CRUD-APP`
    
// DB connection
mongoose.connect(BASE_URI)
    .then((res) => console.log("MongoDB Connect"))
    .catch((err)=> console.log("error",err))

// this is a package need to install when we are calling the below apis from frontend application via fetch or axios etc.
app.use(cors())

// body parser for getting json body on a server (always place on top of al apis )
app.use(express.json())

// middleware that listen every request which hits on this server. It tells that whenever you recieve /api form frontend in any api got to this router function
app.use("/api",router)

app.listen(PORT,() => console.log(`server is running on localhost: ${PORT}`))