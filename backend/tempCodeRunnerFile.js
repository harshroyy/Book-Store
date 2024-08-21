const express = require("express");
const app = express();
require("dotenv").config();


// listening to port 
app.listen(process.env.PORT, () => {
    console.log(`Server Listening to port ${process.env.PORT}`);
})