import db from "./configs/db.js";
import "./models/User.js";
import "./models/Book.js";
import "./models/Loan.js";

async function migrate() {
  try {
    await db
      .authenticate()
      .then(() => console.log("Database connected"))
      .catch((error) => console.log("Error: ", error));

    await db.sync({ force: true });
    console.log("Migration successful");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();
