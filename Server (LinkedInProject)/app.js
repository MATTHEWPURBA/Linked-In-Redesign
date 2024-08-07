const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userTypeDefs = require("./schema/userSchema");
const postTypeDefs = require("./schema/postSchema");
const followTypeDefs = require("./schema/followSchema");
const userResolver = require("./resolver/userResolver");
const postResolver = require("./resolver/postResolver");
const followResolver = require("./resolver/followResolver");
const { GraphQLError } = require("graphql");
const { verifyToken } = require("./helpers/jwt");
require("dotenv").config();

const uploadRouter = require("./route/uploadImage"); // Import the upload route
// const csrf = require("csurf");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Users = require("./models/UserModel");

const app = express();

const corsOptions = {
  origin: "http://localhost:4000/upload", // Update this to your client domain
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Add the upload route to your Express app
app.use("/upload", uploadRouter);

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolver, postResolver, followResolver],
  introspection: true,
});

const port = process.env.PORT || 4000;

Users.createIndexes()

  .then(() => {
    return startStandaloneServer(server, {
      listen: { port },
      context: async ({ req }) => {
        return {
          authentication: () => {
            const authHeader = req.headers.authorization || "";
            // const token = authHeader.split(" ")[1];
            const [type, token] = authHeader.split(" ");
            const secret = process.env.JWT_SECRET;

            if (!token) {
              throw new GraphQLError("Access Token Must Be Provided", {
                extensions: { code: "NOT_AUTHORIZED" },
              });
            }

            if (type !== "Bearer") {
              throw new GraphQLError("Unauthorized");
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
    });
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at: ${url}`);
  })
  .catch((error) => {
    if (error.code === "EACCES" && port === 80) {
      console.error("Port 80 requires elevated privileges");
    } else if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use`);
    } else {
      console.error("Error starting server:", error);
    }
    process.exit(1);
  });
