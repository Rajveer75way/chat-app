import { PubSub, PubSubEngine } from 'graphql-subscriptions';
import jwt from 'jsonwebtoken';
import { sendMessageService, getMessagesService } from './message.service';
import { MessageDTO } from './message.dto';
import User from '../user/user.model';  // Import user model to verify sender
import dotenv from 'dotenv';
const pubsub: PubSubEngine = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';
dotenv.config();
// Secret key used for decoding the token (make sure it's the same key you used when signing the token)
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const resolvers = {
  Query: {
    getMessages: async (_: any, { receiverId }: { receiverId: string }, { headers }: any) => {
      console.log(
        "fdalkfjaskd"
      );
      // Decode the access token from the Authorization header
      const token = headers.authorization?.split(' ')[1]; // Assuming 'Bearer <token>'
      console.log(token+"token");
      if (!token) {
        throw new Error('Unauthorized: Missing token');
      }
      console.log("Received Token:", token);
      console.log("JWT Secret:", "THIS IS SECRET");
      try {
        // Decode the token to get the senderId
        const decoded: any = await jwt.verify(token, JWT_SECRET) as { userId: string };
        console.log("Decoded Token:", decoded);
        // Ensure userId exists in the decoded token
        if (!decoded.userId) {
          throw new Error('Invalid token: Missing userId');
        }
        // Fetch messages between sender and receiver
        const messages = await getMessagesService(decoded.userId, receiverId);
        return messages;
      } catch (error: any) {
        console.error("Error decoding token:", error);
        throw new Error(`Failed to decode token or retrieve messages: ${error.message}`);
      }
    },
  },
  Mutation: {
    sendMessage: async (_: any, { messageData }: { messageData: MessageDTO }, { headers }: any) => {
      // Decode the access token from the Authorization header
      const token = headers.authorization?.split(' ')[1]; // Assuming 'Bearer <token>'
      if (!token) {
        throw new Error('Unauthorized');
      }
      try {
        // Decode the token to get the userId
        const decoded: any = jwt.verify(token, JWT_SECRET) as { userId: string };
        // Ensure that the user exists
        const sender = await User.findById(decoded.userId);
        if (!sender) {
          throw new Error('User not found');
        }
        // Send the message
        const message = await sendMessageService({ ...messageData, senderId: decoded.userId });
        // Publish the message to the subscription channel
        pubsub.publish(MESSAGE_SENT, { messageSent: message, receiverId: messageData.receiverId });
        return message;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: (_: any, { receiverId }: { receiverId: string }) =>  pubsub.publish(MESSAGE_SENT, { receiverId }),
    },
  },
};



