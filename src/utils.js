import Papa from "papaparse";

const filter = (row) =>
  row.Province_State === "New Jersey" &&
  ["Hunterdon", "Somerset"].includes(row.Admin2);

const map = (row) => {
  const { Admin2, Province_State } = row;

  const timeseries = Object.entries(row)
    .filter(([key, _val]) => !isNaN(key.charAt(0)))
    .map(([date, confirmed]) => ({ date, confirmed }));

  return { Admin2, Province_State, timeseries };
};

const getData = async (url) => {
  const response = await fetch(url);
  const text = await response.text();

  const parseResult = await Papa.parse(text, {
    header: true,
  });
  return parseResult.data.filter(filter).map(map);
};

export { getData };
