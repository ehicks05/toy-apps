import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useTable } from "react-table";
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
import Select, { createFilter, components } from "react-select";
import { FixedSizeList as List } from "react-window";

import { queryOptions } from "./constants";
import { getData, processData } from "./utils";

const NUMBER_FORMAT = Intl.NumberFormat("en-US");
const formatNumber = (number) => NUMBER_FORMAT.format(number);

const MenuList = ({ options, children, maxHeight, getValue }) => {
  const height = 35;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div
          key={index}
          style={style}
          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200
          hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-800 hover:dark:text-gray-200
          "
        >
          {children[index]}
        </div>
      )}
    </List>
  );
};

function App() {
  const {
    isLoading,
    isError,
    data: rawData,
  } = useQuery("usData", () => getData(), queryOptions);

  const [UIDs, setUIDs] = useState(["84034019"]); // hunterdon

  const countyOptions = useMemo(() => {
    return rawData
      ? Object.values(rawData.counties).map((county) => ({
          value: county.UID,
          label: county.Combined_Key,
        }))
      : [];
  }, [rawData]);

  const data = useMemo(() => {
    return rawData ? processData(rawData, UIDs) : [];
  }, [rawData, UIDs]);

  if (isError) return <div>Error...</div>;
  if (isLoading || rawData.length === 0) return <div>Loading...</div>;

  const Input = (props) => (
    <components.Input
      {...props}
      inputClassName="bg-gray-700 text-gray-100"
      className="bg-gray-700 text-gray-100"
    />
  );
  const MultiValueContainer = (props) => (
    <components.MultiValueContainer
      {...props}
      className="bg-gray-700 text-gray-100"
    />
  );
  const MultiValue = (props) => (
    <components.MultiValue {...props} className="bg-gray-700 text-gray-100" />
  );
  const MultiValueLabel = (props) => (
    <components.MultiValueLabel
      {...props}
      className="bg-gray-600 text-gray-100"
    />
  );
  const Control = (props) => (
    <components.Control {...props} className="bg-gray-600 text-gray-100" />
  );
  const ValueContainer = (props) => (
    <components.ValueContainer
      {...props}
      className="bg-gray-600 text-gray-100"
    />
  );
  const IndicatorsContainer = (props) => (
    <components.IndicatorsContainer
      {...props}
      className="bg-gray-600 text-gray-100"
    />
  );

  return (
    <div className="p-4">
      <Chart data={data} counties={rawData.counties} UIDs={UIDs} />
      {/* <select
        multiple
        className="text-blue-800"
        value={UIDs}
        onChange={(e) => {
          console.log(e.target.selectedOptions);
          setUIDs([...e.target.selectedOptions].map((o) => o.value));
        }}
      >
        {countyOptions.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select> */}

      <Select
        isMulti
        value={UIDs.map((uid) => countyOptions.find((co) => co.value === uid))}
        options={countyOptions}
        filterOption={createFilter({ ignoreAccents: false })}
        components={{
          MenuList,
          Input,
          MultiValueContainer,
          MultiValue,
          MultiValueLabel,
          Control,
          ValueContainer,
          IndicatorsContainer,
        }}
        onChange={(newValue) => {
          console.log(newValue);
          setUIDs(newValue.map((v) => v.value || v));
        }}
      />
      <Table data={data} counties={rawData.counties} UIDs={UIDs} />
      <footer className="p-1">
        <a
          className="text-blue-500 hover:underline"
          href="https://github.com/CSSEGISandData/COVID-19"
        >
          JHU CSSE COVID-19 Data
        </a>
      </footer>
    </div>
  );
}

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

const Table = ({ data, counties, UIDs }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        id: "date",
        accessor: (row) => {
          return Object.values(row)[0].date;
        },
      },
      {
        Header: "Confirmed Cases",
        columns: UIDs.map((uid) => ({
          Header: `${counties[uid].Admin2}`,
          id: `${uid}-confirmed`,
          accessor: (row) => formatNumber(row[uid].confirmed),
        })),
      },
      {
        Header: "Active Cases",
        columns: UIDs.map((uid) => ({
          Header: `${counties[uid].Admin2}`,
          id: `${uid}-active`,
          accessor: (row) => formatNumber(row[uid].active),
        })),
      },
      {
        Header: "Active Case %",
        columns: UIDs.map((uid) => ({
          Header: `${counties[uid].Admin2}`,
          id: `${uid}-active-%`,
          accessor: (row) => formatNumber(row[uid].activePercent),
        })),
      },
      {
        Header: "Deaths",
        columns: UIDs.map((uid) => ({
          Header: `${counties[uid].Admin2}`,
          id: `${uid}-deaths`,
          accessor: (row) => formatNumber(row[uid].deaths),
        })),
      },
    ],
    [UIDs, counties]
  );

  console.log({ data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="m-auto max-w-screen-xl overflow-x-auto">
      <h1 className="text-2xl">Data</h1>
      <table {...getTableProps()} className="text-xs">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-1 border font-bold"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="p-1 border text-right"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
