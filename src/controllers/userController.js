import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import argon2 from "argon2";

export const registerUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);

    const data = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      msg: "Sukses, 1 Data berhasil ditambahkan!",
      success: true,
      data,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || user == undefined) {
      return res
        .status(404)
        .json({ msg: "User tidak ditemukan!", success: false });
    }
    const payload = {
      user: { name: user.name, username, role: user.role },
    };
    const refreshToken = await generateRefreshToken(payload);
    const optionRefreshTokenCookie = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("refreshToken", refreshToken, optionRefreshTokenCookie);
    if (!user.refreshToken) {
      await user.update({ refreshToken });
    }

    const accessToken = await generateAccessToken(payload);
    const optionAccessTokenCookie = {
      httpOnly: false,
      maxAge: 15 * 60 * 1000,
    };
    res.cookie("accessToken", accessToken, optionAccessTokenCookie);

    return res.status(200).json({
      msg: "Berhasil login!",
      success: true,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const logoutUser = async (req, res) => {
  const user = req.user;

  try {
    await User.update(
      { refreshToken: null },
      { where: { username: user.username } }
    );
    if (req.cookies.refreshToken) {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
    } else {
      res.clearCookie("accessToken");
    }
    return res.status(200).json({ msg: "Berhasil logout!", success: true });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};
