
To create a chart in React that matches the style and functionality shown in the image, a good approach is to use a charting library like Recharts or Chart.js. The example below uses Recharts because it provides strong support for area charts, custom axes, tooltips, and easy styling.

React Chart Example
Here’s a sample React component using Recharts that resembles the chart in your screenshot. It displays progress for Bench Press, Deadlift, and Squats, with area fill, axis labels, legend, and styled data points.

jsx
import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

// Example data mimicking the screenshot
const data = [
  { date: "30/12/2023", BenchPress: 90, Deadlift: null, Squats: null },
  { date: "30/12/2023", BenchPress: 100, Deadlift: 110, Squats: null },
  { date: "30/12/2023", BenchPress: 105, Deadlift: 120, Squats: null },
  { date: "30/12/2023", BenchPress: null, Deadlift: 130, Squats: 90 },
  { date: "01/01/2024", BenchPress: null, Deadlift: null, Squats: 120 },
  { date: "01/01/2024", BenchPress: null, Deadlift: null, Squats: 115 }
];

const COLORS = {
  BenchPress: "#eb6165",
  Deadlift: "#68c1c8",
  Squats: "#68c890"
};

const ProgressChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
      <CartesianGrid stroke="#2c2c2c" vertical={false} />
      <XAxis dataKey="date" tick={{ fill: "#aaa" }} axisLine={false} />
      <YAxis
        domain={[75, 135]}
        ticks={[76, 91, 106, 121, 135]}
        tick={{ fill: "#aaa" }}
        axisLine={false}
        unit="kg"
      />
      <Tooltip />
      <Legend
        verticalAlign="bottom"
        align="left"
        iconType="plainline"
        formatter={(value) => (
          <span style={{ color: COLORS[value], marginLeft: 4 }}>{value}</span>
        )}
      />
      <Area
        type="monotone"
        dataKey="BenchPress"
        stroke={COLORS.BenchPress}
        fill={COLORS.BenchPress}
        fillOpacity={0.3}
        activeDot={{ r: 5 }}
        connectNulls
      />
      <Area
        type="monotone"
        dataKey="Deadlift"
        stroke={COLORS.Deadlift}
        fill={COLORS.Deadlift}
        fillOpacity={0.3}
        activeDot={{ r: 5 }}
        connectNulls
      />
      <Area
        type="monotone"
        dataKey="Squats"
        stroke={COLORS.Squats}
        fill={COLORS.Squats}
        fillOpacity={0.3}
        activeDot={{ r: 5 }}
        connectNulls
      />
    </AreaChart>
  </ResponsiveContainer>
);

export { ProgressChart }