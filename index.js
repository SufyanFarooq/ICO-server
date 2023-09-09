const express = require("express");
const cors = require("cors");
const crypto = require('crypto');
const fs = require('fs');
const bodyParser = require('body-parser');
const dbConnection = require("./connection/db")
const router = require("./router/router")
require('dotenv').config()
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", router)
app.get("/", (req, res)=>{
  res.status(200).send("app running")
})

let PATH =  process.env.PORT || 3344;
let server =app.listen(PATH, ()=>{
    dbConnection();
    console.log(`Marketplace server listening at http://localhost:${PATH}`);
})
process.on('unhandledRejection', error => {
    console.log(error.message);
    server.close(() => process.exit(1));
});