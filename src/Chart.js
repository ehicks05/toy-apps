import { useLocalStorageValue } from "@react-hookz/web/esm";
import { useWindowSize } from "react-use";
import React, { useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { getLocationDisplayName } from "./utils";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DATA_KEY_TO_LABEL = {
  active: "Active",
  activePercent: "Active %",
  confirmed: "Confirmed",
  confirmedPercent: "Confirmed %",
  deaths: "Deaths",
  deathsPercent: "Deaths %",
};

const DATA_SCALE_TO_LABEL = { auto: "linear" };

const Chart = ({ data, counties, UIDs = [] }) => {
  const { height } = useWindowSize();

  const [chartScale, setChartScale] = useLocalStorageValue(
    "chartScale",
    "auto",
    { storeDefaultValue: true }
  );
  const [chartDataKey, setChartDataKey] = useLocalStorageValue(
    "chartDataKey",
    "activePercent",
    { storeDefaultValue: true }
  );

  const brushRange = useRef({ startIndex: 0, endIndex: data.length - 1 });
  const handleBrushChange = (e) => {
    brushRange.current = e;
  };

  return (
    <div>
      <div className="flex justify-between items-end">
        <select
          className="p-1 dark:text-white dark:bg-gray-700"
          value={chartDataKey}
          onChange={(e) => setChartDataKey(e.target.value)}
        >
          {Object.entries(DATA_KEY_TO_LABEL).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setChartScale(chartScale === "auto" ? "log" : "auto")}
          className="text-xs"
        >
          current scale: {DATA_SCALE_TO_LABEL[chartScale] || chartScale}
        </button>
      </div>
      <ResponsiveContainer minHeight={height - 128} width="100%">
        <LineChart data={[...data].reverse()}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={`${UIDs[0]}.date`} />
          <YAxis
            scale={chartScale}
            domain={chartScale === "log" ? ["dataMin", "dataMax"] : undefined}
          />
          <Tooltip contentStyle={{ backgroundColor: "#333" }} />
          <Brush
            dataKey={`${UIDs[0]}.date`}
            height={30}
            stroke="#8884d8"
            startIndex={brushRange.current.startIndex}
            endIndex={brushRange.current.endIndex}
            onChange={(e) => handleBrushChange(e)}
          />
          <Legend />
          {UIDs.map((uid, i) => {
            return (
              <Line
                key={uid}
                dot={false}
                name={getLocationDisplayName(counties[uid])}
                dataKey={`${uid}.${chartDataKey}`}
                unit={chartDataKey.includes("Percent") ? "%" : ""}
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
