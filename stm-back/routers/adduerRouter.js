const express = require("express");
const router = express.Router();
const db = require("./db");
const bcryptjs = require("bcryptjs");

router.post("/", (req, res) => {
  const {
    body: { id, password },
  } = req;

  const hashPassword = bcryptjs.hashSync(password, 5, (err, hash) => {
    if (err) {
      console.log(err);
    }
  });

  db.query(
    "INSERT INTO userregister (userid, userpassword) VALUES (?,?)",
    [id, hashPassword],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).send();
      }
    }
  );
});

module.exports = router;
