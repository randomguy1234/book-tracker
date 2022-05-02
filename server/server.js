const express = require('express');
const {ApolloServer}= require('apollo-server-express');
const path = require('path');
const {typeDefs, resolvers}= require('./schemas');
const {authMiddleware}= require('./utils/auth');

const db = require('./config/connection');
//may need to comment out line below
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server= new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const startApolloServer= async (typeDefs, resolvers) => 
{

  await server.start();
  server.applyMiddleware({app});
}

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//may need to comment out line below
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => 
  {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Graphql will appear at http://localhost:${PORT}${server.graphqlPath}`);
  });

});

startApolloServer(typeDefs, resolvers);