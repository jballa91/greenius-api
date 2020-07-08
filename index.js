const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { isTokenValid } = require("./validate");

const { frontend } = require("./config_cors");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

require("./config");

const corsOptions = {
  origin: `${frontend}`,
  credentials: true,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, ...rest }) => {
    let isAuthenticated = false;
    let user = null;
    try {
      const authHeader = req.headers.authorization || "";
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        const payload = await isTokenValid(token);
        isAuthenticated = payload && payload.decoded.sub ? true : false;
      }
    } catch (e) {
      console.error(e);
    }

    return { ...rest, req, auth: { user, isAuthenticated } };
  },
  cors: corsOptions,
});
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 8080 }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
);
