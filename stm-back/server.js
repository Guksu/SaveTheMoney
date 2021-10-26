const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bcryptjs = require("bcryptjs");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: process.env.PASSWORD,
  database: "mydb",
  dateStrings: "data",
});

// 회원가입 //
app.post("/adduser", (req, res) => {
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

//로그인//
app.post("/login", async (req, res) => {
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

// //카카오로그인
// app.post("/kakaologin", async (req, res) => {
//   const {
//     body: { code },
//   } = req;

//   const hashcode = bcryptjs.hashSync(code, 5, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//   });

//   db.query(
//     "INSERT INTO socialuser (userid) VALUES (?)",
//     [hashcode],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(404).send();
//       }
//     }
//   );
//   res.status(200).send();
// });

//가계부 작성
app.post("/account", async (req, res) => {
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

//상세내역 확인
app.post("/showProfit", async (req, res) => {
  const {
    body: { userid },
  } = req;

  db.query("SELECT * FROM profit WHERE userid=?", userid, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send(result);
      console.log("수입내역 전송 성공");
    }
  });
});

app.post("/showExpense", async (req, res) => {
  const {
    body: { userid },
  } = req;

  db.query("SELECT * FROM expense WHERE userid=?", userid, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send(result);
      console.log("지출내역 전송 성공");
    }
  });
});

//내역 수정
app.post("/modify", (req, res) => {});
app.listen(4000, () => {
  console.log("Server Start at Port 4000!🚀🚀");
});
