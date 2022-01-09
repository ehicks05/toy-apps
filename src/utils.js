import Papa from "papaparse";
import _ from "lodash";
import { subDays, format } from "date-fns";
import {
  usConfirmed,
  usDeaths,
  INFECTION_DURATION,
  POPULATIONS,
} from "./constants";

const numberFormat = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

const pretty = (input) =>
  numberFormat.format(input);

const isNJOrDe = (row) => row.Province_State === "New Jersey" || row.Province_State === "Delaware";

const mapConfirmed = (row) => {
  const { Admin2, Province_State } = row;

  const result = Object.entries(row)
    .filter(([key, _val]) => !isNaN(key.charAt(0)))
    .map(([date, confirmed]) => ({
      Admin2,
      Province_State,
      date: format(new Date(date), "MM/dd/yy"),
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
      date: format(new Date(date), "MM/dd/yy"),
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

  const usConfirmedGrouped = _.groupBy(
    usConfirmedData.data.filter(isNJOrDe).map(mapConfirmed).flat(),
    "date"
  );

  const usDeathsGrouped = _.groupBy(
    usDeathsData.data.filter(isNJOrDe).map(mapDeaths).flat(),
    "date"
  );

  const result = Object.entries(usConfirmedGrouped).map(([date, data]) => ({
    date,
    hunterdonConfirmed: data.find((r) => r.Admin2 === "Hunterdon").confirmed,
    somersetConfirmed: data.find((r) => r.Admin2 === "Somerset").confirmed,
    njConfirmed: _.sumBy(data, (row) => row.Province_State === 'New Jersey' ? row.confirmed : 0),
    hunterdonDeaths: usDeathsGrouped[date].find((r) => r.Admin2 === "Hunterdon")
      .deaths,
    somersetDeaths: usDeathsGrouped[date].find((r) => r.Admin2 === "Somerset")
      .deaths,
    njDeaths: _.sumBy(usDeathsGrouped[date], (row) => row.Province_State === 'New Jersey' ? row.deaths : 0),

    sussexConfirmed: data.find((r) => r.Admin2 === "Sussex").confirmed,
    deConfirmed: _.sumBy(data, (row) => row.Province_State === 'Delaware' ? row.confirmed : 0),
    sussexDeaths: usDeathsGrouped[date].find((r) => r.Admin2 === "Sussex")
      .deaths,
    deDeaths: _.sumBy(usDeathsGrouped[date], (row) => row.Province_State === 'Delaware' ? row.deaths : 0),
  }));

  const resultsWithComputedData = result.map((row) => {
    const targetDate = subDays(new Date(row.date), INFECTION_DURATION);
    const formattedDate = format(targetDate, "MM/dd/yy");

    const somersetCasesToSubtract =
      result.find((row) => row.date === formattedDate)?.somersetConfirmed || 0;
    const somersetActive = row.somersetConfirmed - somersetCasesToSubtract;

    const hunterdonCasesToSubtract =
      result.find((row) => row.date === formattedDate)?.hunterdonConfirmed || 0;
    const hunterdonActive = row.hunterdonConfirmed - hunterdonCasesToSubtract;

    const njCasesToSubtract =
      result.find((row) => row.date === formattedDate)?.njConfirmed || 0;
    const njActive = row.njConfirmed - njCasesToSubtract;

    const somersetActivePercent = pretty(
      (100 * somersetActive) / POPULATIONS.SOMERSET
    );
    const hunterdonActivePercent = pretty(
      (100 * hunterdonActive) / POPULATIONS.HUNTERDON
    );
    const njActivePercent = pretty((100 * njActive) / POPULATIONS.NEW_JERSEY);

    const sussexCasesToSubtract =
    result.find((row) => row.date === formattedDate)?.sussexConfirmed || 0;
    const sussexActive = row.sussexConfirmed - sussexCasesToSubtract;

    const deCasesToSubtract =
      result.find((row) => row.date === formattedDate)?.deConfirmed || 0;
    const deActive = row.deConfirmed - deCasesToSubtract;

    const sussexActivePercent = pretty(
      (100 * sussexActive) / POPULATIONS.SUSSEX
    );
    const deActivePercent = pretty((100 * deActive) / POPULATIONS.DELAWARE);


    return {
      ...row,
      somersetActive,
      hunterdonActive,
      njActive,
      somersetActivePercent,
      hunterdonActivePercent,
      njActivePercent,

      sussexActive,
      deActive,
      sussexActivePercent,
      deActivePercent,
    };
  });

  return resultsWithComputedData;
};

export { getData };
