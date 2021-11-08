const express = require("express");
const router = express.Router();
const db = require("./db");

//내역 삭제
router.post("/profit", async (req, res) => {
  const {
    body: { profitNo },
  } = req;

  db.query("DELETE FROM profit WHERE profitNo=?", profitNo, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

router.post("/expense", async (req, res) => {
  const {
    body: { expenseNo },
  } = req;

  db.query(
    "DELETE FROM expense WHERE expenseNo=?",
    expenseNo,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

module.exports = router;
