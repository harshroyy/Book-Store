const express = require("express");
const app = express();
require('dotenv').config();
require('./conn/conn')
const user = require("./routes/user")
const Books = require("./routes/book")

app.use(express.json());
// routes
app.use("/api/v1", user);
app.use("/api/v1", Books);

// listening to port 
app.listen(process.env.PORT, () => {
    console.log(`Server Listening to port ${process.env.PORT}`);
})