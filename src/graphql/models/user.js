export const Typedef = /* GraphQL */ `
  type Query {
    user: User
  }

  type Mutation {
    createUser(user: NewUserInput!): User
  }

  input NewUserInput {
    name: String!
    age: Int!
  }
  type User {
    id: Int
    name: String
    age: Int
  }
`;

export const resolvers = {
  Query: {
    user: () => {
      return {
        id: 1,
        name: "John Doe",
      };
    },
  },

  Mutation: {
    createUser: async (_, { user }, context) => {
      const movies = await context.client.db("sample_mflix").collection("movies").find().toArray();
      console.log(movies);
      // insert to DB

      return {
        id: 1,
        ...user,
      };
    },
  },

  User: {
    name: (obj) => {
      return obj.name.trim().toUpperCase();
    },
  },
};
