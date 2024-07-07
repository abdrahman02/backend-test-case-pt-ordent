import { body } from "express-validator";
import argon2 from "argon2";
import User from "../models/User.js";

export const registerUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Nama tidak boleh kosong!")
    .isString()
    .withMessage("Name must be string"),
  body("username")
    .notEmpty()
    .withMessage("Username tidak boleh kosong!")
    .isString()
    .withMessage("Username must be string")
    .custom(async (value) => {
      const existingUsername = await User.findOne({
        where: { username: value },
      });
      if (existingUsername) {
        throw new Error("Username sudah digunakan!");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong!")
    .isString()
    .withMessage("Password must be string")
    .isStrongPassword()
    .withMessage("Password minimal 8 karakter serta kombinasi karakter!"),
];

export const loginUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username tidak boleh kosong!")
    .custom(async (value) => {
      const user = await User.findOne({ where: { username: value } });

      if (!user) {
        throw new Error("Username atau password salah!");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong!")
    .custom(async (value, { req }) => {
      const { username } = req.body;
      const user = await User.findOne({
        where: { username },
      });

      const isMatch = await argon2.verify(user.password, value);

      if (!isMatch) {
        throw new Error("Username atau password salah!");
      }
    }),
];
