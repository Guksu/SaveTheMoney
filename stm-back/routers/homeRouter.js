const express = require("express");
const router = express.Router();
const db = require("./db");

// home 표시내역
router.get("/profit", async (req, res) => {
  const {
    query: { userid, date },
  } = req;

  const findDate = `${date}%`;
  if (findDate !== `%`) {
    db.query(
      "SELECT sum(profit) as profit FROM profit where userid=? and date like ?",
      [userid, findDate],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          res.send(result);
          console.log("총 수익내역 전송 성공");
        }
      }
    );
  }
});

router.get("/expense", async (req, res) => {
  const {
    query: { userid, date },
  } = req;

  const findDate = `${date}%`;
  if (findDate !== `%`) {
    db.query(
      "SELECT sum(expense) as expense FROM expense where userid=? and date like ?",
      [userid, findDate],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          res.send(result);
          console.log("총 지출내역 전송 성공");
        }
      }
    );
  }
});

//home chart
router.get("/profitChart", async (req, res) => {
  const {
    query: { userid, date },
  } = req;

  const findDate = `${date}%`;
  if (findDate !== `%`) {
    db.query(
      "SELECT *  FROM profit where userid=? and date like ?",
      [userid, findDate],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          res.send(result);
        }
      }
    );
  }
});

router.get("/expenseChart", async (req, res) => {
  const {
    query: { userid, date },
  } = req;

  const findDate = `${date}%`;
  if (findDate !== `%`) {
    db.query(
      "SELECT *  FROM expense where userid=? and date like ?",
      [userid, findDate],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          res.send(result);
        }
      }
    );
  }
});

module.exports = router;
