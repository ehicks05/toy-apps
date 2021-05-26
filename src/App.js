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

function App() {
  const { isLoading, isError, data } = useQuery(
    "usData",
    () => getData(),
    queryOptions
  );

  const columns = React.useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Somerset Confirmed", accessor: "somersetConfirmed" },
      { Header: "Hunterdon Confirmed", accessor: "hunterdonConfirmed" },
      { Header: "Somerset Active", accessor: "somersetActive" },
      { Header: "Hunterdon Active", accessor: "hunterdonActive" },
      { Header: "Somerset Active Percent", accessor: "somersetActivePercent" },
      {
        Header: "Hunterdon Active Percent",
        accessor: "hunterdonActivePercent",
      },
      { Header: "Somerset Deaths", accessor: "somersetDeaths" },
      { Header: "Hunterdon Deaths", accessor: "hunterdonDeaths" },
    ],
    []
  );

  const reversedData = data ? [...data].reverse() : [];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: reversedData });

  if (isError) return <div>Error...</div>;
  if (isLoading || data.length === 0) return <div>Loading...</div>;

  return (
    <div className="p-4 dark:text-white dark:bg-gray-800">
      <div className="m-auto max-w-screen-xl">
        <h1 className="text-2xl">Confirmed Cases</h1>
        <ResponsiveContainer minHeight={300} width="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis dataKey="somersetConfirmed" />
            <Tooltip />
            <Legend />
            <Line dot={false} dataKey="somersetConfirmed" stroke="#d88488" />
            <Line dot={false} dataKey="hunterdonConfirmed" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="m-auto max-w-screen-xl">
        <h1 className="text-2xl">Active Cases</h1>
        <ResponsiveContainer minHeight={300} width="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="somersetActive" />
            <Tooltip />
            <Legend />
            <Line dot={false} dataKey="somersetActive" stroke="#d88488" />
            <Line dot={false} dataKey="hunterdonActive" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="m-auto max-w-screen-xl">
        <h1 className="text-2xl">Active Cases Percent</h1>
        <ResponsiveContainer minHeight={300} width="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="somersetActivePercent" />
            <Tooltip />
            <Legend />
            <Line
              dot={false}
              dataKey="somersetActivePercent"
              stroke="#d88488"
            />
            <Line
              dot={false}
              dataKey="hunterdonActivePercent"
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="m-auto max-w-screen-xl">
        <h1 className="text-2xl">Deaths</h1>
        <ResponsiveContainer minHeight={300} width="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis dataKey="somersetDeaths" />
            <Tooltip />
            <Legend />
            <Line dot={false} dataKey="somersetDeaths" stroke="#d88488" />
            <Line dot={false} dataKey="hunterdonDeaths" stroke="#8884d8" />
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
                  <th {...column.getHeaderProps()} className="p-1 font-bold">
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
                      <td {...cell.getCellProps()} className="p-1">
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
