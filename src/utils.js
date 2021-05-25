import Papa from "papaparse";

const getData = async (url) => {
  const response = await fetch(url);
  const text = await response.text();

  const parseResult = await Papa.parse(text, {
    header: true,
  });
  return parseResult.data;
};

export { getData };
