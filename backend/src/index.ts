// src/app.ts
import bodyParser from "body-parser";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import mysql from "mysql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

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

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
