

export function loadExpenses() {
    return fetch("/api/expenses")
      .then(res => res.json())
      .catch(err => reject(err));
}

export function saveExpense(data) {
    return fetch ("/api/submit", {
        method: "POST",
        dataType: "json",
        data: {
            expense: data.expense,
            price: data.price
        }
    })
      .then (function(results) {
        console.log(results);
      })
}

export function resetExpense() {
  return fetch ("/api/reset", {
      method: "DELETE"
  })
}