var db = require("../models");


    module.exports = function(app) {
        app.delete("/api/reset", (req, res) => {
          db.Expense.remove({}, function (error, response) {
            if (error) {
              return res.send(error);
            } else {
              return res.send(response);
            }
          });
        });
        
        app.get("/api/expenses", function(req, res) {
          db.Expense.find({}, function(err, dbExpenses) {
            if (err) {
              return console.log(err);
            } else {
              return res.json(dbExpenses);
            }
          });
        });
        
        app.post("/api/submit", function({body}, res) {
          
          db.Expense.create(body)
            .then(function(dbExpenses) {
              res.json(dbExpenses);
            })
            .catch(function(err){
              res.json(err);
            });
        });
      }