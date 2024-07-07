import dotenv from "dotenv";

dotenv.config();

export const jwt = {
  secret: process.env.JWT_SECRET,
  accessTokenExpiration: {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "15m",
  },
  refreshTokenExpiration: {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || "7d",
  },
};
