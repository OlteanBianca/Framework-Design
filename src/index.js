 import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import resolvers from './Schema/Resolvers.js';
import definitions from './Schema/Definitions.js'
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema'; 

const app = express();
app.use(cors());
app.use(bodyParser.json());

const schema = makeExecutableSchema({ typeDefs: definitions, resolvers });

const server = new ApolloServer({ schema });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();