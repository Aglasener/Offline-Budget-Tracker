

export function loadExpenses() {
    return fetch("/api/expenses")
      .then(function(res) {
          console.log(res);
          res.json();
        })
      .catch(err => reject(err));
}

export function saveExpense(data) {
    console.log("This data is being saved: "+JSON.stringify(data))
    return fetch ("/api/submit", {
        method: "POST",
        dataType: "json",
        data: JSON.stringify(data)
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