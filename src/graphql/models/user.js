export const Typedef = /* GraphQL */ `
  type Query {
    user: User
  }
  type User {
    id: Int
    name: String
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

  User: {
    name: (obj) => {
      return obj.name.toUpperCase();
    },
  },
};
