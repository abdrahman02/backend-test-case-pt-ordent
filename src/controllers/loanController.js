import Loan from "../models/Loan.js";
import User from "../models/User.js";
import { Op } from "sequelize";

export const getLoans = async (req, res) => {
  try {
    const datas = await Loan.findAll();
    if (!datas)
      return res.status(404).json({ msg: "Not found", success: false });

    return res
      .status(200)
      .json({ msg: "Get all loans successfully", success: true, datas });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const myLoan = async (req, res) => {
  const { username } = req.user;

  try {
    const data = await User.findOne({ where: { username }, include: Loan });
    if (!data)
      return res.status(404).json({ msg: "Not found", success: false });

    return res.status(200).json({
      msg: "Get your loans successfully",
      success: true,
      data: data.Loans,
    });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const getLoanById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Loan.findByPk(id);
    if (!data)
      return res.status(404).json({ msg: "Not found", success: false });

    return res
      .status(200)
      .json({ msg: "Get loan is successfully", success: true, data });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const createLoan = async (req, res) => {
  const { bookId, userId } = req.body;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);

  try {
    const loanCheck = await Loan.findOne({
      where: { userId, returnDate: { [Op.is]: null } },
    });
    if (loanCheck)
      return res.status(400).json({
        msg: "You have books that have not been returned",
        success: false,
      });

    const data = await Loan.create({ bookId, userId, dueDate });

    return res
      .status(201)
      .json({ msg: "New loan is created", success: true, data });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const returnLoan = async (req, res) => {
  const { id } = req.params;
  const returnDate = new Date();
  try {
    const data = await Loan.findByPk(id);
    if (!data) {
      return res.status(404).json({ msg: "Not found", success: false });
    }

    data.returnDate = returnDate;
    await data.save();

    return res
      .status(200)
      .json({ msg: "Loan has been updated", success: true, data });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const deleteLoan = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Loan.findByPk(id);
    if (!data) {
      return res.status(404).json({ msg: "Not found", success: false });
    }

    await data.destroy();

    return res.status(200).json({
      msg: "Loan has been deleted",
      success: true,
    });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};
