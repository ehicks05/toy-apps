import React from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { getLocationDisplayName, pretty } from "./utils";

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
        disableSortBy: true,
      },
      {
        Header: "Confirmed Cases",
        columns: UIDs.map((uid) => ({
          Header: `${getLocationDisplayName(counties[uid])}`,
          id: `${uid}-confirmed`,
          accessor: (row) => formatNumber(row[uid].confirmed),
        })),
      },
      {
        Header: "Active Cases",
        columns: UIDs.map((uid) => ({
          Header: `${getLocationDisplayName(counties[uid])}`,
          id: `${uid}-active`,
          accessor: (row) => formatNumber(row[uid].active),
        })),
      },
      {
        Header: "Active Case %",
        columns: UIDs.map((uid) => ({
          Header: `${getLocationDisplayName(counties[uid])}`,
          id: `${uid}-active-%`,
          accessor: (row) => formatNumber(row[uid].activePercent),
          Cell: (props) => (
            <React.Fragment>{pretty(props.value)}</React.Fragment>
          ),
        })),
      },
      {
        Header: "Deaths",
        columns: UIDs.map((uid) => ({
          Header: `${getLocationDisplayName(counties[uid])}`,
          id: `${uid}-deaths`,
          accessor: (row) => formatNumber(row[uid].deaths),
        })),
      },
    ],
    [UIDs, counties]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    state: { pageSize },
  } = useTable(
    { columns, data, initialState: { pageSize: 20 } },
    useSortBy,
    usePagination
  );

  return (
    <div className="m-auto overflow-x-auto">
      <h1 className="text-xl">Data</h1>
      <table {...getTableProps()} className="text-xs">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-1 border font-bold"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
      {pageSize !== -1 && (
        <button onClick={() => setPageSize(-1)}>Show All</button>
      )}
    </div>
  );
};

export default Table;
