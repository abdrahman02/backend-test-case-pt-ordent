import Loan from "./Loan.js";
import User from "./User.js";
import Book from "./Book.js";

const associate = () => {
  User.hasMany(Loan, { foreignKey: "userId" });
  Loan.belongsTo(User, { foreignKey: "userId" });

  Book.hasMany(Loan, { foreignKey: "bookId" });
  Loan.belongsTo(Book, { foreignKey: "bookId" });
};

export default associate;
