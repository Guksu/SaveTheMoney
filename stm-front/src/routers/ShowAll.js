import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ExpenseChart from "../components/ExpenseChart";
import ProfitChart from "../components/ProfitChart";
import ProfitList from "../components/ProfitList";
import ExpenseList from "../components/ExpenseList";
import ShowAllStyle from "../styles/ShowAllStyle";

const { ChartDiv, ListDiv, Profit, Expense, BtnDiv, BackBtn } = ShowAllStyle;

const ShowAll = () => {
  const history = useHistory();
  const onClickBackHome = () => history.push("/home");
  const [profitList, setProfitList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:4000/showProfit", {
        params: {
          userid: sessionStorage.getItem("id"),
        },
      })
      .then((res) => {
        setProfitList(res.data);
      });
  }, []);

  useEffect(async () => {
    axios
      .get("http://localhost:4000/showExpense", {
        params: {
          userid: sessionStorage.getItem("id"),
        },
      })
      .then((res) => {
        setExpenseList(res.data);
      });
  }, []);

  return (
    <>
      <ChartDiv>
        <div />
        <ProfitChart profitList={profitList}></ProfitChart>
        <ExpenseChart expenseList={expenseList}></ExpenseChart>
      </ChartDiv>
      <ListDiv>
        <div />
        <Profit>
          수익내역
          <ul>
            <ProfitList profitList={profitList}></ProfitList>
          </ul>
        </Profit>
        <Expense>
          지출내역
          <ul>
            <ExpenseList expenseList={expenseList}></ExpenseList>
          </ul>
        </Expense>
      </ListDiv>
      <BtnDiv>
        <BackBtn onClick={onClickBackHome}>돌아가기</BackBtn>
      </BtnDiv>
    </>
  );
};

export default ShowAll;
