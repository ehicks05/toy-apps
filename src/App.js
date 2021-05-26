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
      { Header: "Somerset Deaths", accessor: "somersetDeaths" },
      { Header: "Hunterdon Deaths", accessor: "hunterdonDeaths" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data || [] });

  if (isError) return <div>Error...</div>;
  if (isLoading || data.length === 0) return <div>Loading...</div>;

  console.log(data);

  return (
    <div className="App">
      <div>
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
      <div>
        <h1>Active Cases</h1>
        <ResponsiveContainer minHeight={300} width="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis dataKey="somersetActive" />
            <Tooltip />
            <Legend />
            <Line dot={false} dataKey="somersetActive" stroke="#d88488" />
            <Line dot={false} dataKey="hunterdonActive" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
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

      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
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
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
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
    </div>
  );
}

export default App;
