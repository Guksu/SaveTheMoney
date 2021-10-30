import axios from "axios";
import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MonthExpenseCharts from "../components/MonthExpenseCharts";
import MonthProfitCharts from "../components/MonthProfitCharts";
import HomeStyle from "../styles/HomeStyle";

const {
  LogOutBtn,
  LogOutDiv,
  AccountBtn,
  AccountDiv,
  CalDiv,
  Calender,
  ChartDiv,
  Ul,
  Li,
} = HomeStyle;
const Home = () => {
  const [selectMonth, setSelectMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [allProfit, setAllProfit] = useState([]);
  const [allExpense, setAllExpense] = useState([]);

  const getProfit = async () => {
    await axios
      .get("http://localhost:4000/allProfit", {
        params: {
          date: selectMonth,
          userid: sessionStorage.getItem("id"),
        },
      })
      .then((res) => {
        setAllProfit(res.data);
      });
  };

  const getExpense = async () => {
    await axios
      .get("http://localhost:4000/allExpense", {
        params: {
          date: selectMonth,
          userid: sessionStorage.getItem("id"),
        },
      })
      .then((res) => {
        setAllExpense(res.data);
      });
  };

  const history = useHistory();

  const onClickLogout = () => {
    sessionStorage.removeItem("id");
    history.push("/");
    window.location.reload();
  };

  useEffect(() => {
    getProfit();
    getExpense();
  }, [selectMonth]);

  return (
    <>
      <CalDiv>
        <Calender
          type="month"
          onChange={(e) => {
            setSelectMonth(e.target.value);
          }}
          defaultValue={new Date().toISOString().slice(0, 7)}
        ></Calender>
      </CalDiv>
      <ChartDiv>
        <div />
        <MonthProfitCharts selectMonth={selectMonth}></MonthProfitCharts>
        <MonthExpenseCharts selectMonth={selectMonth}></MonthExpenseCharts>
      </ChartDiv>
      <Ul>
        {allProfit.map((item) => {
          if (item.profit !== null) {
            return <Li>총 수입 : [ {item.profit.toLocaleString()}원 ] </Li>;
          } else {
            return <Li>총 수입 : [ 0원 ]</Li>;
          }
        })}
        {allExpense.map((item) => {
          if (item.expense !== null) {
            return <Li>총 지출 : [ {item.expense.toLocaleString()}원 ]</Li>;
          } else {
            return <Li>총 수입 : [ 0원 ]</Li>;
          }
        })}
      </Ul>
      <AccountDiv>
        <Link to="/account">
          <AccountBtn>가계부 입력</AccountBtn>
        </Link>
        <Link to="/showall">
          <AccountBtn>상세내역 확인</AccountBtn>
        </Link>
      </AccountDiv>
      <LogOutDiv>
        <LogOutBtn onClick={onClickLogout}>로그아웃</LogOutBtn>
      </LogOutDiv>
    </>
  );
};

export default Home;
