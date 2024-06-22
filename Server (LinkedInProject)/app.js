// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userTypeDefs = require("./schema/userSchema");
const postTypeDefs = require("./schema/postSchema");
const followTypeDefs = require ("./schema/followSchema")
const userResolver = require("./resolver/userResolver");
const postResolver = require("./resolver/postResolver");
const followResolver = require("./resolver/followResolver");

const { GraphQLError } = require("graphql");
const { verifyToken } = require("./helpers/jwt");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs,followTypeDefs],
  resolvers: [userResolver, postResolver,followResolver],
  introspection: true,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    return {
      authentication: () => {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;

        if (!token) {
          throw new GraphQLError("Access Token Must Be Provided", {
            extensions: { code: "NOT_AUTHORIZED" },
          });
        }

        const decodeToken = verifyToken(token, secret);
        if (!decodeToken) {
          throw new GraphQLError("Access Must Be Valid", {
            extensions: { code: "NOT_AUTHORIZED" },
          });
        }

        return decodeToken;
      },
    };
  },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((error) => console.log(error));
