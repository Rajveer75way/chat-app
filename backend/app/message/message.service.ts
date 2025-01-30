import Message from './message.model'; // Message Model for creating and fetching messages
import { MessageDTO } from './message.dto'; // DTO for message data
export const getMessagesService = async (senderId: string, receiverId: string) => {
  try {
    // Fetch messages between the sender and receiver
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // Sorting messages by createdAt in ascending order
    return messages;
  } catch (error) {
    throw new Error('Failed to fetch messages');
  }
};
export const sendMessageService = async (messageData: MessageDTO) => {
  try {
    // Create a new message
    const newMessage = new Message({
      senderId: messageData.senderId,
      receiverId: messageData.receiverId,
      content: messageData.content,
      media: messageData.media,
    });
    // Save the message to the database
    await newMessage.save();
    // Return the saved message
    return newMessage;
  } catch (error) {
    throw new Error('Failed to send message');
  }
};
