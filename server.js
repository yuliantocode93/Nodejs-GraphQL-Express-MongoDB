var { graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server");

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
      resolve: (obj) => {
        const name = obj.name.trim().toUpperCase();
        if (obj.isAdmin) {
          return `${name} (ADMIN)`;
        }
        return name;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return "Hello ";
        },
      },

      user: {
        type: User,
        resolve: () => {
          return {
            id: 1,
            name: "     John     ",
            isAdmin: true,
          };
        },
      },
    },
  }),
});

const app = express();

app.all("/graphql", createHandler({ schema }));

app.get("/", (req, res) => {
  res.type("text/html");
  res.send(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000);
console.log(`Api running on http://localhost:4000`);
