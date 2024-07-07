import express from "express";
import { guestMiddleware } from "../middlewares/guestMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/userValidator.js";
import { validate } from "../middlewares/validationMiddleware.js";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/register",
  guestMiddleware,
  registerUserValidator,
  validate,
  registerUser
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/login", guestMiddleware, loginUserValidator, validate, loginUser);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 */
router.post("/logout", authMiddleware, logoutUser);

export default router;
