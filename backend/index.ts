import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { resolvers as userResolvers } from './app/user/user.resolver';
import UserSchema from './app/user/user.schema';  // GraphQL schema
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectToMongo } from './app/common/services/database.service';
import MessageSchema from './app/message/message.schema';
import { resolvers as messageResolver } from './app/message/message.resolver';
dotenv.config();
const app: Application = express();
// Set up the Apollo Server with Express
const server = new ApolloServer({
  typeDefs: [UserSchema, MessageSchema],  // Use UserSchema for type definitions
  resolvers: [userResolvers , messageResolver],  // Use userResolvers to handle GraphQL operations
  context: ({ req }) => {
    console.log("object", "req");
    return {
      
      headers: req.headers,  // This ensures headers are accessible in resolvers
    }}
});
// Apply the Apollo server as middleware
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app});
};
startServer();
app.use(morgan('dev'));
// Set up MongoDB connection using Mongoose
connectToMongo();
// Start the Express server
console.log(process.env.PORT);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}${server.graphqlPath}`);
});









