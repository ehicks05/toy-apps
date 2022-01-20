import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data, counties, UIDs }) => {
  const d = [...data].reverse();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="m-auto max-w-screen-xl">
      <h1 className="text-2xl">Active Cases %</h1>
      <ResponsiveContainer minHeight={400} width="100%">
        <LineChart data={d}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={`${UIDs[0]}.date`} />
          <YAxis
            dataKey={`${UIDs[0]}.activePercent`}
            // scale={"log"}
            // domain={[0, "dataMax"]}
          />
          <Tooltip contentStyle={{ backgroundColor: "#333" }} />
          <Legend />
          {UIDs.map((uid, i) => (
            <Line
              key={uid}
              dot={false}
              name={counties[uid].Admin2}
              dataKey={`${uid}.activePercent`}
              unit="%"
              stroke={COLORS[i % UIDs.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
