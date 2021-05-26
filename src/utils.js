import Papa from "papaparse";
import _ from "lodash";
import { subDays, format } from "date-fns";
import { usConfirmed, usDeaths, INFECTION_DURATION } from "./constants";

const filter = (row) =>
  row.Province_State === "New Jersey" &&
  ["Hunterdon", "Somerset"].includes(row.Admin2);

const mapConfirmed = (row) => {
  const { Admin2, Province_State } = row;

  const result = Object.entries(row)
    .filter(([key, _val]) => !isNaN(key.charAt(0)))
    .map(([date, confirmed]) => ({
      Admin2,
      Province_State,
      date,
      confirmed: Number(confirmed),
    }));

  return result;
};

const mapDeaths = (row) => {
  const { Admin2, Province_State } = row;

  const result = Object.entries(row)
    .filter(([key, _val]) => !isNaN(key.charAt(0)))
    .map(([date, deaths]) => ({
      Admin2,
      Province_State,
      date,
      deaths: Number(deaths),
    }));

  return result;
};

const getText = async (url) => {
  return await (await fetch(url)).text();
};

const getData = async () => {
  const usConfirmedData = await Papa.parse(await getText(usConfirmed), {
    header: true,
  });

  const usDeathsData = await Papa.parse(await getText(usDeaths), {
    header: true,
  });

  console.log(usDeathsData);

  const usConfirmedGrouped = _.groupBy(
    usConfirmedData.data.filter(filter).map(mapConfirmed).flat(),
    "date"
  );

  const usDeathsGrouped = _.groupBy(
    usDeathsData.data.filter(filter).map(mapDeaths).flat(),
    "date"
  );

  const result = Object.entries(usConfirmedGrouped).map(([date, data]) => ({
    date,
    hunterdonConfirmed: data.find((r) => r.Admin2 === "Hunterdon").confirmed,
    somersetConfirmed: data.find((r) => r.Admin2 === "Somerset").confirmed,
    hunterdonDeaths: usDeathsGrouped[date].find((r) => r.Admin2 === "Hunterdon")
      .deaths,
    somersetDeaths: usDeathsGrouped[date].find((r) => r.Admin2 === "Somerset")
      .deaths,
  }));

  const resultsWithActiveCounts = result.map((row) => {
    const date = subDays(new Date(row.date), INFECTION_DURATION);
    const formatted = format(date, "M/d/yy");

    console.log(`original: ${row.date}, new: ${formatted}`);

    const casesToSubtract =
      result.find((row) => row.date === formatted)?.somersetConfirmed || 0;
    const somersetActive = row.somersetConfirmed - casesToSubtract;

    return { ...row, somersetActive };
  });

  return resultsWithActiveCounts;
};

export { getData };
