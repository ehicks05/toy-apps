import React from "react";
import "./App.css";
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
    <div className="App" style={{ padding: "1rem" }}>
      <div style={{ margin: "auto", maxWidth: "1024px" }}>
        <h1>Confirmed Cases</h1>
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
      <div style={{ margin: "auto", maxWidth: "1024px" }}>
        <h1>Active Cases</h1>
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
      <div style={{ margin: "auto", maxWidth: "1024px" }}>
        <h1>Active Cases Percent</h1>
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
      <div style={{ margin: "auto", maxWidth: "1024px" }}>
        <h1>Deaths</h1>
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

      <h1>Data</h1>
      <table {...getTableProps()} style={{ margin: "auto", fontSize: ".8rem" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    padding: "4px",
                    background: "lightgray",
                    color: "black",
                    fontWeight: "bold",
                  }}
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
                      style={{
                        padding: "4px",
                        background: "lightgray",
                      }}
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
      <footer style={{ padding: "1rem" }}>
        <a href="https://github.com/CSSEGISandData/COVID-19">
          JHU CSSE COVID-19 Data
        </a>
      </footer>
    </div>
  );
}

export default App;
