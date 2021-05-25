import Papa from "papaparse";
import _ from "lodash";

const filter = (row) =>
  row.Province_State === "New Jersey" &&
  ["Hunterdon", "Somerset"].includes(row.Admin2);

const map = (row) => {
  const { Admin2, Province_State } = row;

  const result = Object.entries(row)
    .filter(([key, _val]) => !isNaN(key.charAt(0)))
    .map(([date, confirmed]) => ({ Admin2, Province_State, date, confirmed }));

  return result;
};

const getData = async (url) => {
  const response = await fetch(url);
  const text = await response.text();

  const parseResult = await Papa.parse(text, {
    header: true,
  });
  const grouped = _.groupBy(
    parseResult.data.filter(filter).map(map).flat(),
    "date"
  );

  const result = Object.entries(grouped).map(([date, data]) => ({
    date,
    hunterdonConfirmed: Number(
      data.find((row) => row.Admin2 === "Hunterdon").confirmed
    ),
    somersetConfirmed: Number(
      data.find((row) => row.Admin2 === "Somerset").confirmed
    ),
  }));

  return result;
};

export { getData };
