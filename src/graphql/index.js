import { createSchema } from "graphql-yoga";
import { Typedef as User, resolvers as userResolvers } from "./models/user.js";
import _ from "lodash";
const { merge } = _;

const queries = /* GraphQL */ `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL Yoga",
  },
};

export const schema = createSchema({
  typeDefs: [queries, User],
  resolvers: merge(resolvers, userResolvers),
});
