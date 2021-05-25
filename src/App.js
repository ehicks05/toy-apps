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
} from "recharts";

import { usConfirmed, queryOptions } from "./constants";
import { getData } from "./utils";

function App() {
  const { isLoading, isError, data } = useQuery(
    "usConfirmed",
    () => getData(usConfirmed),
    queryOptions
  );

  const columns = React.useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Somerset Confirmed", accessor: "somersetConfirmed" },
      { Header: "Hunterdon Confirmed", accessor: "hunterdonConfirmed" },
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
      <LineChart width={800} height={600} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis dataKey="somersetConfirmed" />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="somersetConfirmed" stroke="#d88488" />
        <Line type="linear" dataKey="hunterdonConfirmed" stroke="#8884d8" />
      </LineChart>

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
