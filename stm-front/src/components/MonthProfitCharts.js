import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";

const MonthProfitCharts = (props) => {
  const [list, setList] = useState([]);

  const getProfit = async () => {
    await axios
      .get("http://localhost:4000/homeProfitChart", {
        params: {
          date: props.selectMonth,
          userid: sessionStorage.getItem("id"),
        },
      })
      .then((res) => {
        setList(res.data);
      });
  };

  const wage = list.filter((item) => item.category === "급여");
  const investment = list.filter((item) => item.category === "투자");
  const pocketMoney = list.filter((item) => item.category === "용돈");
  const etc = list.filter((item) => item.category === "기타등등");

  let wageValue = 0;
  for (let i = 0; i < wage.length; i++) {
    wageValue += wage[i].profit;
  }

  let investmentValue = 0;
  for (let i = 0; i < investment.length; i++) {
    investmentValue += investment[i].profit;
  }

  let pocketMoneyValue = 0;
  for (let i = 0; i < pocketMoney.length; i++) {
    pocketMoneyValue += pocketMoney[i].profit;
  }

  let etcValue = 0;
  for (let i = 0; i < etc.length; i++) {
    etcValue += etc[i].profit;
  }

  const data = [
    {
      id: "급여",
      label: "급여",
      value: wageValue,
      color: "hsl(5, 70%, 50%)",
    },
    {
      id: "투자",
      label: "투자",
      value: investmentValue,
      color: "hsl(17, 70%, 50%)",
    },
    {
      id: "용돈",
      label: "용돈",
      value: pocketMoneyValue,
      color: "hsl(297, 70%, 50%)",
    },
    {
      id: "기타등등",
      label: "기타등등",
      value: etcValue,
      color: "hsl(320, 70%, 50%)",
    },
  ];

  useEffect(() => {
    getProfit();
  }, [props.selectMonth]);

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

export default MonthProfitCharts;
