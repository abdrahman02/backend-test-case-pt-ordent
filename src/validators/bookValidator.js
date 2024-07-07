import { body } from "express-validator";

export const bookValidator = [
  body("title")
    .notEmpty()
    .withMessage("Judul buku harus diisi")
    .isString()
    .withMessage("Judul buku must be string"),
  body("author")
    .notEmpty()
    .withMessage("Pengarang buku harus diisi")
    .isString()
    .withMessage("Pengarang buku must be string"),
  body("publishedYear")
    .notEmpty()
    .withMessage("Tahun terbit harus diisi")
    .isInt()
    .withMessage("Tahun terbit must be date"),
];
