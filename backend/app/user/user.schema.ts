import { gql } from 'apollo-server-express';
const UserSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    accessToken: String!
    refreshToken: String!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type Query {
    getAllUsers: [User]
  }
  type Mutation {
    signup(userData: UserInput!): User
    login(loginData: LoginInput!): User
    refreshToken(refreshToken: String!): String
    logout(refreshToken: String!): String
  }
`;
export default UserSchema;