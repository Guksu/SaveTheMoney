import React from "react";
import axios from "axios";
import ListStyle from "../styles/ListStyle";
const { Li, RemoveBtn } = ListStyle;
const ExpenseList = (props) => {
  const list = props.expenseList;

  return (
    <>
      {list.map((item) => {
        const onRemoveClick = async () => {
          window.location.reload();
          await axios.post("http://localhost:4000/remove/expense", {
            expenseNo: item.expenseNo,
          });
        };

        return (
          <>
            <Li key={item.expenseNo}>
              {item.date} : {item.category} [ {item.expense.toLocaleString()}원
              ]<RemoveBtn onClick={onRemoveClick}>❌</RemoveBtn>
            </Li>
          </>
        );
      })}
    </>
  );
};

export default ExpenseList;
