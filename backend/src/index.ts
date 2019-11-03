// src/app.ts
import bodyParser from "body-parser";
import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema, isInputObjectType } from "graphql";
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
        isPrivate: Boolean!,
        endDate: Int!,
        choices: [ChoiceInput!]!
    },
    type Query {
        getPoll(id: String!, emailHash: String): Poll
    },
    type Mutation {
        createPoll(input: PollInput): Poll
        vote(pollId: String!, votes: [ChoiceInput]!, emailHash: String): Boolean!
        subscribe(pollId: String!, email: String!, emailHash: String): Boolean!
    },
    type Poll {
        id: String!
        name: String!
        prompt: String
        numWinners: Int!
        isPrivate: Boolean!
        endDate: Int!
        choices: [Choice!]!
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
    },
    input ChoiceInput {
      id: Int
      name: String!
      description: String
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

class Poll {
  constructor(public id: string, public name: string, public prompt: string, public numWinners: number,
              public isPrivate: boolean, public endDate: number, public choices: Choice[]) {}

}

class Choice {
  constructor(public id: number, public name: string, public description: string) {}
}

const getPoll = (args: {id: number}) => {
  const id = db.escape(args.id);
  db.query(`SELECT accessor FROM polls WHERE accessor = $id`, (error, results, fields) => {
    if (error) { throw error; } else { return results[0]; }
  });

  // TODO: lookup poll in database and return
};

function randomString() : String {
  return [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
}

const createPoll = (args: any) => {
  const input = args.input;
  const name: string = db.escape(input.name);
  const numWinners: number = input.numWinners;
  const description: string = input.description;
  const isPrivate: boolean = input.isPrivate;
  const endDate: boolean = input.endDate;
  const choices: Choice[] = input.choices;

  db.query(`INSERT INTO Polls (name, prompt, winners_num, accessor, end_date, private)
  VALUES (${name}, ${description}, ${numWinners}, ${randomString()}, ${endDate}, ${isPrivate})
  `, (error, results, fields) => {
    if (error)
      throw error;
    else
      return results[0];
  });
};

const vote = (args: any) => {

};

// Root resolver
const root = {
  getPoll,
  createPoll,
  vote
};

// Create an express server and a GraphQL endpoint
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(6699, () => console.log("Express GraphQL Server Now Running On localhost:4000/graphql"));
