import express from "express";
import { ruruHTML } from "ruru/server";

import { createYoga } from "graphql-yoga";
import { schema } from "./src/graphql/index.js";
import { setupDatabase } from "./src/mongo/index.js";

const yoga = createYoga({
  schema,
  context: async () => {
    const mongo = await setupDatabase();
    return {
      client: mongo.client,
      db: mongo.db,
      users: mongo.users,
      movies: mongo.movies,
      comments: mongo.comments,
    };
  },
});

const app = express();

app.all("/graphql", yoga);

app.get("/", (req, res) => {
  res.type("text/html");
  res.send(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000);
console.log(`
  Api running on: http://localhost:4000
`);
