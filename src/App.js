import React from "react";
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

import { queryOptions } from "./constants";
import { getData } from "./utils";

const NUMBER_FORMAT = Intl.NumberFormat("en-US");
const formatNumber = (number) => NUMBER_FORMAT.format(number);

function App() {
  const { isLoading, isError, data } = useQuery(
    "usData",
    () => getData(),
    queryOptions
  );

  const columns = React.useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      {
        Header: "Confirmed Cases",
        columns: [
          {
            Header: "NJ",
            id: "njConfirmed",
            accessor: (row) => formatNumber(row.njConfirmed),
          },
          {
            Header: "Somerset",
            id: "somersetConfirmed",
            accessor: (row) => formatNumber(row.somersetConfirmed),
          },
          {
            Header: "Hunterdon",
            id: "hunterdonConfirmed",
            accessor: (row) => formatNumber(row.hunterdonConfirmed),
          },
        ],
      },
      {
        Header: "Active Cases",
        columns: [
          {
            Header: "NJ",
            id: "njActive",
            accessor: (row) => formatNumber(row.njActive),
          },
          {
            Header: "Somerset",
            id: "somersetActive",
            accessor: (row) => formatNumber(row.somersetActive),
          },
          {
            Header: "Hunterdon",
            id: "hunterdonActive",
            accessor: (row) => formatNumber(row.hunterdonActive),
          },
        ],
      },
      {
        Header: "Active Case %",
        columns: [
          {
            Header: "NJ",
            id: "njActivePercent",
            accessor: (row) => formatNumber(row.njActivePercent),
          },
          {
            Header: "Somerset",
            id: "somersetActivePercent",
            accessor: (row) => formatNumber(row.somersetActivePercent),
          },
          {
            Header: "Hunterdon",
            id: "hunterdonActivePercent",
            accessor: (row) => formatNumber(row.hunterdonActivePercent),
          },
        ],
      },
      {
        Header: "Deaths",
        columns: [
          {
            Header: "NJ",
            id: "njDeaths",
            accessor: (row) => formatNumber(row.njDeaths),
          },
          {
            Header: "Somerset",
            id: "somersetDeaths",
            accessor: (row) => formatNumber(row.somersetDeaths),
          },
          {
            Header: "Hunterdon",
            id: "hunterdonDeaths",
            accessor: (row) => formatNumber(row.hunterdonDeaths),
          },
        ],
      },
    ],
    []
  );

  const reversedData = data ? [...data].reverse() : [];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: reversedData });

  if (isError) return <div>Error...</div>;
  if (isLoading || data.length === 0) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="m-auto max-w-screen-xl">
        <h1 className="text-2xl">Active Cases %</h1>
        <ResponsiveContainer minHeight={300} width="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="njActivePercent" />
            <Tooltip contentStyle={{ backgroundColor: "#333" }} />
            <Legend />
            <Line
              dot={false}
              name="NJ"
              dataKey="njActivePercent"
              unit="%"
              stroke="#88d488"
            />
            <Line
              dot={false}
              name="Somerset"
              dataKey="somersetActivePercent"
              unit="%"
              stroke="#d88488"
            />
            <Line
              dot={false}
              name="Hunterdon"
              dataKey="hunterdonActivePercent"
              unit="%"
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

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

export default App;
