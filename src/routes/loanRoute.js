import express from "express";
import {
  getLoans,
  myLoan,
  getLoanById,
  createLoan,
  returnLoan,
  deleteLoan,
} from "../controllers/loanController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { createLoanValidator } from "../validators/loanValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: API for managing loans
 */

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: Successfully retrieved all loans
 *       404:
 *         description: Loans not found
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, authorizeRoles("admin"), getLoans);

/**
 * @swagger
 * /loans/my-loan:
 *   get:
 *     summary: Get current user's loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: Successfully retrieved user's loans
 *       404:
 *         description: User's loans not found
 *       500:
 *         description: Internal server error
 */
router.get("/my-loan", authMiddleware, authorizeRoles("member"), myLoan);

/**
 * @swagger
 * /loans/{id}:
 *   get:
 *     summary: Get a loan by ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the loan
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validate,
  getLoanById
);

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Create a new loan
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Loan created successfully
 *       400:
 *         description: Validation error or existing active loan
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles("member"),
  createLoanValidator,
  validate,
  createLoan
);

/**
 * @swagger
 * /loans/{id}/return:
 *   put:
 *     summary: Return a loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: Loan returned successfully
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id/return", authMiddleware, authorizeRoles("member"), returnLoan);

/**
 * @swagger
 * /loans/{id}:
 *   delete:
 *     summary: Delete a loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: Loan deleted successfully
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  validate,
  deleteLoan
);

export default router;
