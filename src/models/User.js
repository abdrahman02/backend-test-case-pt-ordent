import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import { v4 as uuidv4 } from "uuid";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "member"),
      allowNull: false,
      defaultValue: "member",
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
