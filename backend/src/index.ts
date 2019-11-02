// src/app.ts
import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
