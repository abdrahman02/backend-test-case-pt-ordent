import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./configs/db.js";
import userRoute from "./routes/userRoute.js";
import bookRoute from "./routes/bookRoute.js";
import loanRoute from "./routes/loanRoute.js";
import associate from "./models/Associations.js";
import setupSwagger from "./configs/swagger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

associate();
setupSwagger(app);

app.use("/api", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/loans", loanRoute);

await db
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Error: ", error));

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
