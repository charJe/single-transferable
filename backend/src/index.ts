// src/app.ts
import bodyParser = require("body-parser");
import express = require("express");
import graphqlHTTP = require("express-graphql");
import mysql = require("mysql");

// Create a new express application instance
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "single_transferable",
  insecureAuth: true
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
