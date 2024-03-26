import express from "express";
import { ruruHTML } from "ruru/server";

import { createYoga } from "graphql-yoga";
import { schema } from "./src/graphql/index.js";

const yoga = createYoga({
  schema,
});

const app = express();

app.all("/graphql", yoga);

app.get("/", (req, res) => {
  res.type("text/html");
  res.send(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000);
console.log(`Api running on http://localhost:4000`);
