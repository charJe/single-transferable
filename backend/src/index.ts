// src/app.ts
import bodyParser = require("body-parser");
import express = require("express");
import mysql = require("mysql");

// Create a new express application instance
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
