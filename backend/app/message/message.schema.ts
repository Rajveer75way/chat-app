import { gql } from 'apollo-server-express';

const MessageSchema = gql`
  scalar DateTime
  
  type Message {
    id: ID!
    senderId: ID!
    receiverId: ID!
    content: String
    media: String
    createdAt: DateTime!
    updatedAt: DateTime
  }

  input MessageInput {
    receiverId: ID!
    content: String!
    media: String
  }

  type Query {
    getMessages(senderId: ID!, receiverId: ID!): [Message!]!
  }

  type Mutation {
    sendMessage(messageData: MessageInput!): Message!
  }

  type Subscription {
    messageSent(receiverId: ID!): Message!
  }
`;

export default MessageSchema;