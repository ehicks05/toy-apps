import React from "react";
import "./App.css";
import { useQuery } from "react-query";
import { useTable } from "react-table";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import { usConfirmed, queryOptions } from "./constants";
import { getData } from "./utils";

function App() {
  const { isLoading, isError, data } = useQuery(
    "usConfirmed",
    () => getData(usConfirmed),
    queryOptions
  );

  const filter = (key) => {
    return ["Admin2", "Province_State"].includes(key) || !isNaN(key.charAt(0));
  };

  const columns = React.useMemo(
    () =>
      Object.keys(data?.length > 0 ? data[0] : {})
        .filter(filter)
        .map((key) => ({
          Header: key,
          accessor: key,
        })),
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div className="App">
      <LineChart width={800} height={600}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis dataKey="confirmed" />
        <Line
          data={data[0]}
          type="linear"
          dataKey="confirmed"
          stroke="#8884d8"
        />
        <Line
          data={data[1]}
          type="linear"
          dataKey="confirmed"
          stroke="#8884d8"
        />
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
