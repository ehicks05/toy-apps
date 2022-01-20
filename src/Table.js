import React from "react";
import { useTable } from "react-table";

const NUMBER_FORMAT = Intl.NumberFormat("en-US");
const formatNumber = (number) => NUMBER_FORMAT.format(number);

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

export default Table;
