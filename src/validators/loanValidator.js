import { body } from "express-validator";

export const createLoanValidator = [
  body("bookId")
    .isString()
    .withMessage("bookId must be string")
    .notEmpty()
    .withMessage("ID buku harus diisi"),
  body("userId")
    .isString()
    .withMessage("userId must be string")
    .notEmpty()
    .withMessage("ID pengguna harus diisi"),
];
