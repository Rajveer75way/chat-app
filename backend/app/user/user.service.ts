import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './user.model';
import { UserDTO, LoginDTO } from './user.dto';
import { generateTokens } from '../utils/tokenHelper';
/**
 * Signs up a new user.
 */
export const signupService = async (userData: UserDTO) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser: any = new User({ ...userData, password: hashedPassword });
  await newUser.save();
  const tokens = generateTokens(newUser._id.toString());
  newUser.accessToken = tokens.accessToken;
  newUser.refreshToken = tokens.refreshToken;
  await newUser.save();
  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};
/**
 * Handles user login.
 */
export const loginService = async (loginData: LoginDTO) => {
  const user: any = await User.findOne({ email: loginData.email });
  if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const tokens = generateTokens(user._id.toString());
  user.accessToken = tokens.accessToken;
  user.refreshToken = tokens.refreshToken;
  await user.save();
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  };
};
/**
 * Fetches all users in the system.
 */
export const getAllUsersService = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};
/**
 * Refreshes the access token using the refresh token.
 */
export const refreshAccessToken = async (refreshToken: string) => {
  const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new Error('User not found');
  }
  const newAccessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
  user.accessToken = newAccessToken;
  await user.save();
  return newAccessToken;
};
/**
 * Logs out the user by invalidating the refresh token.
 */
export const logoutService = async (refreshToken: string) => {
  const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
  const user = await User.findByIdAndUpdate(decoded.userId, { $set: { refreshToken: null } });
  if (!user) {
    throw new Error('Failed to log out user');
  }
};


