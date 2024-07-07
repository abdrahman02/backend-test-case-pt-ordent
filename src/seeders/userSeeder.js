import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";

const seedUsers = async () => {
  const users = [
    {
      id: uuidv4(),
      name: "Administrator",
      username: "admin",
      password: await argon2.hash("admin"),
      role: "admin",
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      name: "Member User",
      username: "member",
      password: await argon2.hash("member"),
      role: "member",
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await User.bulkCreate(users);
  console.log("Users seeded");
};

export default seedUsers;
