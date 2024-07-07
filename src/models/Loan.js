import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { v4 as uuidv4 } from "uuid";

const Loan = db.define(
  "Loan",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true }
);

export default Loan;
