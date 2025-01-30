import jwt from 'jsonwebtoken';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET||"THIS IS SECRET";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET|| "THIS IS REFRESH SECRET";
// Function to generate access and refresh tokens
export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '2hr' });
  const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};