const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/", async (req, res) => {
  const {
    body: { date, profit, expense, profitSelect, expenseSelect, userid },
  } = req;

  if (profit !== 0) {
    db.query(
      `INSERT INTO  profit (userid, profit, date,category) VALUES (?,?,?,?)`,
      [userid, profit, date, profitSelect],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).send();
        } else {
          console.log("성공");
        }
      }
    );
  }

  if (expense !== 0) {
    db.query(
      `INSERT INTO  expense (userid, date, expense,category) VALUES (?,?,?,?)`,
      [userid, date, expense, expenseSelect],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).send();
        }
      }
    );
  }
});

module.exports = router;
