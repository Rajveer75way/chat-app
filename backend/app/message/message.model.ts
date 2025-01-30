import mongoose, { Document, Schema } from 'mongoose';

export interface MessageDocument extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content?: string;
  media?: string;
  createdAt: Date;
}

const MessageSchema = new Schema<MessageDocument>(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    media: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model<MessageDocument>('Message', MessageSchema);
export default Message;