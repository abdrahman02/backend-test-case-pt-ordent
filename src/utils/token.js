import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { jwt as jwtConfig } from "../configs/jwt.js";

dotenv.config();

export const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    jwtConfig.accessTokenExpiration
  );
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    jwtConfig.refreshTokenExpiration
  );
};

export const updateAccessToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({
      msg: "Unauthorized",
      success: false,
    });
  }

  try {
    const refreshTokenFromDB = await User.findOne({
      where: { refreshToken },
    });
    if (!refreshTokenFromDB) {
      return res.status(403).json({ msg: "Forbidden", success: false });
    }
    const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET);

    const accessToken = await generateAccessToken(decoded.user);
    const optionAccessTokenCookie = { httpOnly: false, maxAge: 15 * 60 * 1000 };
    res.cookie("accessToken", accessToken, optionAccessTokenCookie);

    req.user = decoded.user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Panggil fungsi logout aja
      //   await Token.findOneAndUpdate(
      //     { refresh_token: refreshToken },
      //     { $set: { refresh_token: null } },
      //     { new: true }
      //   );
      //   if (req.cookies.refreshToken) {
      //     res.clearCookie("refreshToken");
      //     res.clearCookie("accessToken");
      //   } else {
      //     res.clearCookie("accessToken");
      //   }
      //   return res.status(401).json({
      //     msg: "Token telah expired, silahkan login kembali!",
      //     success: true,
      //   });
    } else {
      return res.status(401).json({
        msg: "Internal server error",
        success: false,
      });
    }
  }
};
