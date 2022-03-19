import { useLocalStorageValue } from "@react-hookz/web/esm";
import { useWindowSize } from "react-use";
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
import { isAfter, isBefore, isSameDay, isValid, parse } from "date-fns";

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

const Chart = ({ data: nonTimeFilteredData, counties, UIDs = [] }) => {
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
  const [chartMinDate, setChartMinDate] = useLocalStorageValue(
    "chartMinDate",
    ""
  );
  const [chartMaxDate, setChartMaxDate] = useLocalStorageValue(
    "chartMaxDate",
    ""
  );
  const minDate = parse(chartMinDate, "yyyy-MM-dd", new Date());
  const maxDate = parse(chartMaxDate, "yyyy-MM-dd", new Date());
  const isInvalidDateFilter = isBefore(maxDate, minDate);

  const dateFilter = (dateString) => {
    const date = parse(dateString, "MM/dd/yy", new Date());

    if (isInvalidDateFilter) return true;

    return (
      (!isValid(maxDate) ||
        isBefore(date, maxDate) ||
        isSameDay(date, maxDate)) &&
      (!isValid(minDate) || isAfter(date, minDate) || isSameDay(date, minDate))
    );
  };

  const data = nonTimeFilteredData.filter((d) =>
    dateFilter(d[Object.keys(d)[0]].date)
  );

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
            domain={[chartDataKey.includes("Percent") ? 0.01 : "auto", "auto"]}
          />
          <Tooltip contentStyle={{ backgroundColor: "#333" }} />
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
      <div className="flex justify-between">
        <input
          className="bg-gray-700"
          type={"date"}
          value={chartMinDate}
          onChange={(e) => setChartMinDate(e.target.value)}
        />
        {isInvalidDateFilter && (
          <div className="px-4 bg-red-800">Invalid Date Filter</div>
        )}
        <input
          className="bg-gray-700"
          type={"date"}
          value={chartMaxDate}
          onChange={(e) => setChartMaxDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Chart;
