// src/app.ts
import bodyParser from "body-parser";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import mysql from "mysql";

/* 
 * GraphQL schema for polls
 * getPoll: accessor -> poll TODO: return a fragment of poll instead
 * 
 */
const schema = buildSchema(`
    type Query {
        getPoll(accessor: String!): Poll 
    },
    type mutation {
      createPoll(name: String!): Int 
    },
    type Poll {
      id: Int!
      name: String!
      prompt: String
      numWinners: Int!
      uniqueAccessor: String!
      private: Boolean!
      endDate: Int!
    },
    type User {
      id: Int!
      uniqueAccessor: String!
      email: String!
      ip: String!
    },
    type Choice {

    }
`);

// Create a new express application instance
const app = express();

/*
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
*/

const coursesData = [
  {
      id: 1,
      title: "The Complete Node.js Developer Course",
      author: "Andrew Mead, Rob Percival",
      description: "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
      topic: "Node.js",
      url: "https://codingthesmartway.com/courses/nodejs/"
  },
  {
      id: 2,
      title: "Node.js, Express & MongoDB Dev to Deployment",
      author: "Brad Traversy",
      description: "Learn by example building & deploying real-world Node.js applications from absolute scratch",
      topic: "Node.js",
      url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/"
  },
  {
      id: 3,
      title: "JavaScript: Understanding The Weird Parts",
      author: "Anthony Alicea",
      description: "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
      topic: "JavaScript",
      url: "https://codingthesmartway.com/courses/understand-javascript/"
  }
];

const getCourse = (args: any) => {
  const id = args.id;
  return coursesData.filter((course) => {
      return course.id === id;
  })[0];
};

const getCourses = (args: any) => {
  if (args.topic) {
      const topic = args.topic;
      return coursesData.filter((course) => course.topic === topic);
  } else {
      return coursesData;
  }
};

const lookupPoll = (args: any) => {
  if (args.pollId) {

  }
}

// Root resolver
const root = {
  course: getCourse,
  courses: getCourses,

};

// Create an express server and a GraphQL endpoint
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => console.log("Express GraphQL Server Now Running On localhost:4000/graphql"));
