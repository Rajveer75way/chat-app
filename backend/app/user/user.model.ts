import mongoose, { Document, Schema } from 'mongoose';
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
}
const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
});
const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;