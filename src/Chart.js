import { useLocalStorageValue } from "@react-hookz/web/esm";
import React from "react";
import * as R from "ramda";
import _ from "lodash";
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
import { getLocationDisplayName } from "./utils";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const findUidIndexWithGreatestY = (data, UIDs) => {
    const uidToMaxActivePercent = R.map((uid) => {
    const activePercentsByDay = data?.map((dateRow) => {
      return Number(dateRow[uid]?.activePercent);
    });
    const maxActivePercent = _.max(activePercentsByDay);
    return { uid, maxActivePercent };
  })(UIDs);

  const uidWithGreatestY = _.maxBy(
    uidToMaxActivePercent,
    (i) => i.maxActivePercent
  ).uid;
  return UIDs.indexOf(uidWithGreatestY);
}

const Chart = ({ data, counties, UIDs = [] }) => {
  const [chartScale, setChartScale] = useLocalStorageValue(
    "chartScale",
    "auto",
    { storeDefaultValue: true }
  );

  const uidIndexWithGreatestY = UIDs.length ? findUidIndexWithGreatestY(data, UIDs) : 0;

  return (
    <div>
      <div className="flex justify-between items-end">
        <h1 className="text-xl">Active Cases %</h1>
        <button
          onClick={() => setChartScale(chartScale === "auto" ? "log" : "auto")}
          className="text-xs"
        >
          current scale: {chartScale}
        </button>
      </div>
      <ResponsiveContainer minHeight={400} width="100%">
        <LineChart data={[...data].reverse()}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={`${UIDs[0]}.date`} />
          <YAxis
            dataKey={`${UIDs[uidIndexWithGreatestY]}.activePercent`}
            scale={chartScale}
            domain={chartScale === "auto" ? [0, "dataMax"] : [("auto", "auto")]}
          />
          <Tooltip contentStyle={{ backgroundColor: "#333" }} />
          <Legend />
          {UIDs.map((uid, i) => {
            return (
              <Line
                key={uid}
                dot={false}
                name={getLocationDisplayName(counties[uid])}
                dataKey={`${uid}.activePercent`}
                unit="%"
                stroke={COLORS[i % UIDs.length]}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
