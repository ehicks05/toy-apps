import { useState } from "react";
import { DEFAULT_USER, data } from "./data";

function DataTable() {
  const [user, setUser] = useState(DEFAULT_USER);
  const columns = data.columns;
  const tableData = data.tableData;

  const headerRow = columns.map((column) => {
    return (
      <th
        key={column.key}
        className={
          "px-2 py-1 " + (column.key === "tier" ? "text-left" : "text-right")
        }
      >
        {column.title}
      </th>
    );
  });

  const dataRows = [...tableData].reverse().map((dataRow) => {
    const dataRowEl = columns.map((column) => {
      if (dataRow.tier === "You") {
        if (column.key === "tier") {
          return (
            <th
              className="px-2 py-1 text-left"
              key={`${dataRow.tier} ${column.key}`}
            >
              {dataRow.tier}
            </th>
          );
        } else {
          return (
            <td
              className={"px-2 py-1 text-right"}
              key={`${dataRow.tier} ${column.key}`}
            >
              <input
                className={
                  "w-full text-right bg-gray-100 dark:text-gray-50 dark:bg-gray-900"
                }
                inputMode={"numeric"}
                value={user[column.key]}
                onChange={(e) => {
                  setUser({
                    ...user,
                    [column.key]: Number(e.target.value),
                  });
                }}
              />
            </td>
          );
        }
      } else {
        // @ts-ignore
        const value = dataRow[column.key];

        if (column.key === "tier") {
          return (
            <th
              className="px-2 py-1 text-left"
              key={`${dataRow.tier} ${column.key}`}
            >
              {value}
            </th>
          );
        } else {
          // @ts-ignore
          const levelUnlocked = column.biggerIsBetter
            ? user[column.key] >= value
            : user[column.key] <= value;
          return (
            <td
              key={`${dataRow.tier} ${column.key}`}
              className={`px-2 py-1 text-right ${
                levelUnlocked ? "text-gray-50 bg-green-700" : ""
              }`}
            >
              {`${value} ${column.unit}`}
            </td>
          );
        }
      }
    });

    return (
      <tr className="border-b" key={dataRow.tier}>
        {dataRowEl}
      </tr>
    );
  });

  return (
    <div style={{ overflow: "auto" }}>
      <table className="w-full">
        <thead>
          <tr className="border-b-2">{headerRow}</tr>
        </thead>
        <tbody>{dataRows}</tbody>
      </table>
    </div>
  );
}

export default DataTable;
