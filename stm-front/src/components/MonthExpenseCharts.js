import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";

const MonthExpenseCharts = (props) => {
  const [list, setList] = useState([]);

  const getExpense = async () => {
    await axios
      .get("http://localhost:4000/homeExpenseChart", {
        params: {
          date: props.selectMonth,
          userid: sessionStorage.getItem("id"),
        },
      })
      .then((res) => {
        setList(res.data);
      });
  };

  const food = list.filter((item) => item.category === "식비");
  const clothes = list.filter((item) => item.category === "의류비");
  const investment = list.filter((item) => item.category === "투자");
  const tax = list.filter((item) => item.category === "세금");
  const etc = list.filter((item) => item.category === "기타등등");

  let foodValue = 0;
  for (let i = 0; i < food.length; i++) {
    foodValue += food[i].expense;
  }

  let clothesValue = 0;
  for (let i = 0; i < clothes.length; i++) {
    clothesValue += clothes[i].expense;
  }

  let investmentValue = 0;
  for (let i = 0; i < investment.length; i++) {
    investmentValue += investment[i].expense;
  }

  let taxValue = 0;
  for (let i = 0; i < tax.length; i++) {
    taxValue += tax[i].expense;
  }

  let etcValue = 0;
  for (let i = 0; i < etc.length; i++) {
    etcValue += etc[i].expense;
  }

  const data = [
    {
      id: "식비",
      label: "식비",
      value: foodValue,
      color: "hsl(5, 70%, 50%)",
    },
    {
      id: "의류비",
      label: "의류비",
      value: clothesValue,
      color: "hsl(17, 70%, 50%)",
    },
    {
      id: "투자",
      label: "투자",
      value: investmentValue,
      color: "hsl(297, 70%, 50%)",
    },
    {
      id: "세금",
      label: "세금",
      value: taxValue,
      color: "hsl(320, 70%, 50%)",
    },
    {
      id: "기타등등",
      label: "기타등등",
      value: etcValue,
      color: "hsl(228, 70%, 50%)",
    },
  ];

  useEffect(() => {
    getExpense();
  }, props.selectMonth);

  return (
    <div style={{ height: 300 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        valueFormat=" >-,"
        innerRadius={0.45}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "set3" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MonthExpenseCharts;
