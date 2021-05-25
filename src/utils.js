import Papa from "papaparse";

const filter = (row) =>
  row.Province_State === "New Jersey" &&
  ["Hunterdon", "Somerset"].includes(row.Admin2);

const getData = async (url) => {
  const response = await fetch(url);
  const text = await response.text();

  const parseResult = await Papa.parse(text, {
    header: true,
  });
  return parseResult.data.filter(filter);
};

export { getData };
