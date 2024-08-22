const express = require("express");
const app = express();
require('dotenv').config();
require('./conn/conn')
const user = require("./routes/user")
const Books = require("./routes/book")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")

app.use(express.json());
// routes
app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);

// listening to port 
app.listen(process.env.PORT, () => {
    console.log(`Server Listening to port ${process.env.PORT}`);
})