import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { updateAccessToken } from "../utils/token.js";

dotenv.config();
export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({
      msg: "Unauthorized",
      success: false,
    });
  const accessToken = authorization.split(" ")[1];

  try {
    const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      await updateAccessToken(req, res, next);
    } else {
      return res.status(401).json({
        msg: "Internal server error",
        success: false,
      });
    }
  }
};