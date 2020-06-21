const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { isTokenValid } = require("./validate");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

require("./config");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let isAuthenticated = false;
    try {
      const authHeader = req.headers.authorization || "";
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        const payload = await isTokenValid(token);
        isAuthenticated = payload && payload.sub ? true : false;
      }
    } catch (e) {
      console.error(e);
    }

    return isAuthenticated;
  },
});
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
