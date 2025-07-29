import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#326e0a", "#930909"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPieChart = ({ data }) => {
  const legendStyle = {
    marginRight: 0, // Adjust this value as needed
  };
  return (
    <ResponsiveContainer
      width="100%"
      height={400}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      className="custom-pie-chart-container">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={190}
          fill="#8884d8"
          dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          align="right"
          verticalAlign="bottom"
          layout="vertical"
          wrapperStyle={{ fontSize: "20px", padding: "10px", legendStyle }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
