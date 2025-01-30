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
import { signupService, loginService, getAllUsersService, refreshAccessToken, logoutService } from './user.service';
import { UserDTO, LoginDTO } from './user.dto';
export const resolvers = {
  Query: {
    // Query to get all users
    getAllUsers: async () => {
      try {
        return await getAllUsersService();
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
  },
  Mutation: {
    // Mutation to sign up a new user
    signup: async (_: any, { userData }: { userData: UserDTO }) => {
      try {
        const user = await signupService(userData);
        return user;
      } catch (error:any) {
        throw new Error(error.message);
      }
    },
    // Mutation to login a user
    login: async (_: any, { loginData }: { loginData: LoginDTO }) => {
      try {
        const user = await loginService(loginData);
        return user;
      } catch (error:any) {
        throw new Error(error.message);
      }
    },
    // Mutation to refresh the access token
    refreshToken: async (_: any, { refreshToken }: { refreshToken: string }) => {
      try {
        return await refreshAccessToken(refreshToken);
      } catch (error) {
        throw new Error('Failed to refresh access token');
      }
    },
    // Mutation to log out the user
    logout: async (_: any, { refreshToken }: { refreshToken: string }) => {
      try {
        await logoutService(refreshToken);
        return 'Logged out successfully';
      } catch (error) {
        throw new Error('Failed to log out');
      }
    },
  }
};