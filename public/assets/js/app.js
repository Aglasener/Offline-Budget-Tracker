
import { subtract } from "./calculations";
import { balanceEl, expenseEl, expensesListEl, priceEl, submitBtn, resetBtn } from "./elements";
import { saveExpense, loadExpenses, resetExpense } from "./api";

function addToList(name, price) {
  expensesListEl.innerHTML += `<li class="list-group-item">Name: ${name}
    <span class="ml-4">Price: ${price}</span></li>`;
}

function submit(e) {
  e.preventDefault();
  const total = subtract(Number(balanceEl.innerText), priceEl.value);
  balanceEl.innerText = total;
  addToList(expenseEl.value, priceEl.value);
  let data = {"expense": expenseEl.value, "price": priceEl.value};
  saveExpense(data);
}

function reset(e) {
  e.preventDefault();
  const total = 2000;
  balanceEl.innerText = total;
  expensesListEl.innerHTML = "";
  resetExpense();
}

submitBtn.onclick = submit;
resetBtn.onclick = reset;

loadExpenses().then(results => {
  console.log("Expense: " + results)
  results.forEach(expense => {
    addToList(expense.name, expense.value);
  });
});
