import React from "react";
import axios from "axios";
import ListStyle from "../styles/ListStyle";

const { Li, RemoveBtn } = ListStyle;

const ProfitList = (props) => {
  const list = props.profitList;

  return (
    <>
      {list.map((item) => {
        const onRemoveClick = async () => {
          window.location.reload();
          await axios.post("http://localhost:4000/deleteProfit", {
            profitNo: item.profitNo,
          });
        };

        return (
          <>
            <Li key={item.profitNo}>
              {item.date} : {item.category} [ {item.profit.toLocaleString()}원 ]
              <RemoveBtn onClick={onRemoveClick}>❌</RemoveBtn>
            </Li>
          </>
        );
      })}
    </>
  );
};

export default ProfitList;
