import { createSchema } from "graphql-yoga";
import { Typedef as User } from "./models/user.js";

const queries = /* GraphQL */ `
  type Query {
    hello: String
    user: User
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL Yoga",
    user: () => {
      return {
        id: 1,
        name: "John Doe",
      };
    },
  },

  User: {
    name: (obj) => {
      return obj.name.toUpperCase();
    },
  },
};

export const schema = createSchema({
  typeDefs: [queries, User],

  resolvers,
});
