import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const datas = await Book.findAll();
    if (!datas)
      return res.status(404).json({ msg: "Not found", success: false });

    return res
      .status(200)
      .json({ msg: "Get all books successfully", success: true, datas });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Book.findByPk(id);
    if (!data)
      return res.status(404).json({ msg: "Not found", success: false });

    return res
      .status(200)
      .json({ msg: "Get book is successfully", success: true, data });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const createBook = async (req, res) => {
  const { title, author, publishedYear } = req.body;

  try {
    const data = await Book.create({
      title,
      author,
      publishedYear,
    });
    return res
      .status(201)
      .json({ msg: "New book is created", success: true, data });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishedYear } = req.body;

  try {
    const data = await Book.findByPk(id);
    if (!data) {
      return res.status(404).json({ msg: "Not found", success: false });
    }

    data.title = title || data.title;
    data.author = author || data.author;
    data.publishedYear = publishedYear || data.publishedYear;
    await data.save();

    return res.status(200).json({
      msg: "Book has been updated",
      success: true,
      data,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Book.findByPk(id);
    if (!data) {
      return res.status(404).json({ msg: "Not found", success: false });
    }

    await data.destroy();

    return res.status(200).json({
      msg: "Book has been deleted",
      success: true,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      msg: "Internal server error",
      success: false,
    });
  }
};
