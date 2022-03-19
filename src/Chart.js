import { useLocalStorageValue } from "@react-hookz/web/esm";
import { useWindowSize } from "react-use";
import React, { useRef } from "react";
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

const findUidIndexWithGreatestY = (data, UIDs, dataKey) => {
  const uidToMaxValue = R.map((uid) => {
    const valueByDay = data?.map((dateRow) => {
      return Number(dateRow[uid]?.[dataKey]);
    });
    const maxValue = _.max(valueByDay);
    return { uid, maxValue };
  })(UIDs);

  const uidWithGreatestY = _.maxBy(uidToMaxValue, (i) => i.maxValue).uid;
  return UIDs.indexOf(uidWithGreatestY);
};

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

  const uidIndexWithGreatestY = UIDs.length
    ? findUidIndexWithGreatestY(data, UIDs, chartDataKey)
    : 0;

  return (
    <div>
      <div className="flex justify-between items-end">
        <select
          className="text-xl dark:text-white dark:bg-gray-700"
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
          current scale: {chartScale}
        </button>
      </div>
      <ResponsiveContainer minHeight={height - 128} width="100%">
        <LineChart data={[...data].reverse()}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={`${UIDs[0]}.date`} />
          <YAxis
            dataKey={`${UIDs[uidIndexWithGreatestY]}.${chartDataKey}`}
            scale={chartScale}
            domain={["dataMin", "dataMax"]}
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
