const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/profit", async (req, res) => {
  const {
    query: { userid },
  } = req;
  db.query(
    "SELECT * FROM profit WHERE userid=? ORDER BY date desc ",
    [userid],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send(result);
        console.log("수입내역 전송 성공");
      }
    }
  );
});

router.get("/expense", async (req, res) => {
  const {
    query: { userid },
  } = req;

  db.query(
    "SELECT * FROM expense WHERE userid=? ORDER BY date desc",
    [userid],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send(result);
        console.log("지출내역 전송 성공");
      }
    }
  );
});

module.exports = router;
