var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
  expense: { type: String, required: true },
  price: { type: Number, required: true },
});

var Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;
