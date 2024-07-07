import db from "../configs/db.js";
import seedUsers from "./userSeeder.js";
import seedBooks from "./bookSeeder.js";
import Loan from "../models/Loan.js";
import Book from "../models/Book.js";
import User from "../models/User.js";

const seedAll = async () => {
  try {
    await db.sync({ force: true });
    console.log("Database synced");

    await Loan.drop();
    await Book.drop();
    await User.drop();
    console.log("All tables have been dropped");

    await db.sync();
    console.log("Database has syncronized");

    await seedUsers();
    await seedBooks();

    console.log("All data seeded");
  } catch (error) {
    console.error("Failed to seed data:", error);
  } finally {
    await db.close();
  }
};

seedAll();
