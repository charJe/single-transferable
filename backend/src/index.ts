// src/app.ts
import bodyParser from "body-parser";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import mysql from "mysql";

/* 
 * GraphQL schema for polls
 * Queries:
 *   - getPoll: (id: String) -> poll, returns the poll with the specified id, or null if no poll found
 *   - subscribe: (email: String), subscribes email to update when voting has finished
 * Mutations:
 *   - createPoll: (input: PollInput) -> String, creates a poll from input, and returns 
 *   - vote: 
 * Poll:
 *   - id: String, unique value used to access poll through URL and lookup, required
 *   - name: String, name of poll, required
 *   - prompt: String, poll prompt, optional
 *   - numWinners: Int, number of possible winners, required
 *   - private: Boolean, publicity of poll, required
 *   - endDate: Int, end date of poll in unix time, required
 *   - choices: [Choice!], list of possible choices for poll, required
 *   - users: [User!], list of users invited to poll, only available for private polls
 * User:
 *   - id: String, unique value for user, required
 *   - email: String, email address of user, required
 *   - ip: String, user's IP address, required
 * Choice:
 *   - id: Int, auto-assigned id for the choice if choices are ordered, optional
 *   - name: String, name of choice, required
 *   - descripton: String, description of choice, required
 */
const schema = buildSchema(`
    input PollInput {
        name: String!
        prompt: String
        numWinners: Int!
        private: Boolean!, 
        endDate: Int!,
        choices: [Choice!]!
    },
    type Query {
        getPoll(id: String!): Poll 
    },
    type Mutation {
        createPoll(input: PollInput): String
        vote(pollId: String!, votes: [Vote]!, emailHash: String)
        subscribe(pollId: String!, )
    },
    type Poll {
        id: String!
        name: String!
        prompt: String
        numWinners: Int!
        private: Boolean!
        endDate: Int!
        choices: [Choice!]!
        users: [User!]
    },
    type User {
        id: String!
        email: String!
        ip: String!
    },
    type Choice {
        id: Int
        name: String!
        description: String
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

const getPoll = (args: any) => {
  const id = args.id;
  // TODO: lookup poll in database and return
};

const createPoll = (args: any) => {

};

const vote = (args: any) => {

};

// Root resolver
const root = {
  getPoll: getPoll,
  createPoll: createPoll,
  vote: vote
};

// Create an express server and a GraphQL endpoint
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(6699, () => console.log("Express GraphQL Server Now Running On localhost:4000/graphql"));
