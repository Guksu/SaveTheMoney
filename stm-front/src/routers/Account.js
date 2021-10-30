import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import AccountStyle from "../styles/AccountStyle";

const {
  AccountForm,
  Calender,
  ProfitDiv,
  Profit,
  ProfitSelect,
  ExpenseDiv,
  Expense,
  ExpenseSelect,
  SaveBtn,
  BackBtnDiv,
  BackBtn,
} = AccountStyle;

const Account = () => {
  const history = useHistory();

  const onClickBackHome = () => {
    history.push("/home");
  };

  const [date, setDate] = useState("");
  const [profit, setProfit] = useState("0");
  const [expense, setExpense] = useState("0");
  const [profitSelect, setProfitSelect] = useState("기타등등");
  const [expenseSelect, setExpenseSelect] = useState("기타등등");

  const onSubmitAccount = async (e) => {
    await Axios.post("http://localhost:4000/account", {
      date: date,
      profit: parseInt(profit.replace(/,/g, "")),
      expense: parseInt(expense.replace(/,/g, "")),
      profitSelect: profitSelect,
      expenseSelect: expenseSelect,
      userid: sessionStorage.getItem("id"),
    })
      .then((res) => {})
      .catch((err) => {
        alert("다시 입력하세요");
      });
  };

  //input값 콤마 입력코드
  const changNum = (e) => {
    const i = e.target;
    const startPosition = i.value.length - i.selectionEnd;
    i.value = i.value
      .replace(/^0+|\D+/g, "")
      .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    const len = Math.max(i.value.length - startPosition, 0);
    i.setSelectionRange(len, len);
  };

  return (
    <>
      <AccountForm onSubmit={onSubmitAccount}>
        <Calender
          type="date"
          placeholder="날짜를 선택하세요"
          required
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></Calender>
        <ProfitDiv>
          <Profit
            type="text"
            onInput={changNum}
            placeholder="수입을 입력하세요"
            name="profit"
            onChange={(event) => {
              setProfit(event.target.value);
            }}
          ></Profit>
          <ProfitSelect
            onChange={(event) => {
              setProfitSelect(event.target.value);
            }}
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="급여">급여</option>
            <option value="투자">투자</option>
            <option value="용돈">용돈</option>
            <option value="기타등등">기타등등</option>
          </ProfitSelect>
        </ProfitDiv>
        <ExpenseDiv>
          <Expense
            type="text"
            onInput={changNum}
            placeholder="지출을 입력하세요"
            name="expense"
            onChange={(event) => {
              setExpense(event.target.value.toLocaleString());
            }}
          ></Expense>
          <ExpenseSelect
            onChange={(event) => {
              setExpenseSelect(event.target.value);
            }}
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="식비">식비</option>
            <option value="의류비">의류비</option>
            <option value="투자">투자</option>
            <option value="세금">세금</option>
            <option value="기타등등">기타등등</option>
          </ExpenseSelect>
        </ExpenseDiv>
        <SaveBtn>저장</SaveBtn>
      </AccountForm>
      <BackBtnDiv>
        <BackBtn onClick={onClickBackHome}>돌아가기</BackBtn>
      </BackBtnDiv>
    </>
  );
};

export default Account;
