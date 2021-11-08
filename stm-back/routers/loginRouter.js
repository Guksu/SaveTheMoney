const express = require("express");
const router = express.Router();
const db = require("./db");
const bcryptjs = require("bcryptjs");

router.post("/", async (req, res) => {
  const {
    body: { id, password },
  } = req;

  db.query("SELECT * FROM userregister WHERE userid=?", id, (err, resultId) => {
    if (err) {
      console.log(err);
    }

    if (resultId.length > 0) {
      if (
        bcryptjs.compareSync(
          password,
          resultId[0].userpassword,
          (error, resultPw) => {
            if (error) {
              console.log(error);
            }
          }
        )
      ) {
      } else {
        res.status(404).send();
      }
    } else {
      console.log("로그인실패");
      res.status(404).send();
    }
    res.status(200).send();
  });
});

module.exports = router;
