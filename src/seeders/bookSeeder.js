import { v4 as uuidv4 } from "uuid";
import Book from "../models/Book.js";

const seedBooks = async () => {
  const books = [
    {
      id: uuidv4(),
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publishedYear: 1925,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publishedYear: 1960,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await Book.bulkCreate(books);
  console.log("Books seeded");
};

export default seedBooks;
