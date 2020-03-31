var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
  expense: { type: String },
  price: { type: Number },
});

var Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;
