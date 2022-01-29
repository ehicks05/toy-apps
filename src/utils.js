import Papa from "papaparse";
import _ from "lodash";
import { subDays, format } from "date-fns";
import { usConfirmedUrl, usDeathsUrl, INFECTION_DURATION } from "./constants";
import {UsaStates} from 'usa-states'

const usaStates = _.keyBy(new UsaStates().states, 'name');

export const getLocationDisplayName = ({ Admin2, Province_State }) => {
  if (!Admin2 && !Province_State) return undefined;
  const state = usaStates[Province_State]?.abbreviation || Province_State;
  return `${Admin2 ? `${Admin2}, ` : ""}${state}`;
};

const numberFormat = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const pretty = (input) => numberFormat.format(input);
const dateRegex = /\d+\/\d+\/\d+/g;

const mergeDatasets = (merged, UIDs) => {
  // split each row into a row-per-date that includes the combined metadata from each file,
  // along with the confirmed and deaths counts for that date.
  const mergedAndSplit = merged
    .filter((sets) => UIDs.includes(sets.confirmedRow.UID))
    .map(({ confirmedRow, deathsRow }) => {
      const [confirmedDates, confirmedRawMetadata] = _.partition(
        Object.entries(confirmedRow),
        (r) => r[0].match(dateRegex)
      );
      const confirmedMetadata = confirmedRawMetadata.reduce(
        (acc, cur) => ({ ...acc, [cur[0]]: cur[1] }),
        {}
      );

      const [deathsDates, deathsRawMetadata] = _.partition(
        Object.entries(deathsRow),
        (r) => r[0].match(dateRegex)
      );
      const deathsMetadata = deathsRawMetadata.reduce(
        (acc, cur) => ({ ...acc, [cur[0]]: cur[1] }),
        {}
      );

      const mergedMetadata = _.merge(confirmedMetadata, deathsMetadata);

      const population = Number(deathsRow.Population);

      return confirmedDates.map(([confirmedDate, confirmedValue]) => {
        const [, deathsValue] = deathsDates.find(
          ([k, v]) => k === confirmedDate
        );

        const prevDate = format(
          subDays(new Date(confirmedDate), INFECTION_DURATION),
          "M/d/yy"
        );
        const confirmedOnPrevDate = confirmedRow[prevDate] || 0;

        const active = Number(confirmedValue) - Number(confirmedOnPrevDate);
        const activePercent = Number(pretty((active / population) * 100));
        const confirmed = Number(confirmedValue);
        const confirmedPercent = Number(pretty((confirmed / population) * 100));
        const deaths = Number(deathsValue);
        const deathsPercent = Number(pretty((deaths / population) * 100));

        return {
          ...mergedMetadata,
          date: format(new Date(confirmedDate), "MM/dd/yy"),
          active: active === 0 ? null : active,
          activePercent: activePercent === 0 ? null : activePercent,
          confirmed: confirmed === 0 ? null : confirmed,
          confirmedPercent: confirmedPercent === 0 ? null : confirmedPercent,
          deaths: deaths === 0 ? null : deaths,
          deathsPercent: deathsPercent === 0 ? null : deathsPercent,
        };
      });
    })
    .flat();

  // object keyed by date, each date points to an array
  // with a row for each county
  const byDate = _.groupBy(mergedAndSplit, "date");

  const byDateByUID = Object.fromEntries(
    Object.entries(byDate).map((entry) => [entry[0], _.keyBy(entry[1], "UID")])
  );

  const values = Object.values(Object.values(byDateByUID));

  return values.reverse();
};

const fetchText = async (url) => {
  return await (await fetch(url)).text();
};

const getData = async () => {
  const usConfirmed = Papa.parse(await fetchText(usConfirmedUrl), {
    header: true,
  });
  const usDeaths = Papa.parse(await fetchText(usDeathsUrl), {
    header: true,
  });
  console.log("CSVs fetched and parsed");

  const confirmedData = usConfirmed.data;
  const deathsData = usDeaths.data;

  // take each confirmed row and match it to the deaths row for the same municipality
  const mergedData = confirmedData.map((confirmedRow) => {
    const deathsRow = deathsData.find((d) => d.UID === confirmedRow.UID);
    if (!deathsRow) return confirmedRow;
    return { confirmedRow, deathsRow };
  });

  const mergedMetadata = mergedData.map(({ confirmedRow, deathsRow }) => {
    const confirmedMetadata = Object.entries(confirmedRow)
      .filter((r) => !r[0].match(dateRegex))
      .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
    const deathsMetadata = Object.entries(deathsRow)
      .filter((r) => !r[0].match(dateRegex))
      .reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});

    return _.merge(confirmedMetadata, deathsMetadata);
  });

  const counties = _.keyBy(mergedMetadata, "UID");
  return { mergedData, counties };
};

const processData = (data, UIDs) => {
  const mergedDatasets = mergeDatasets(data.mergedData, UIDs);
  return mergedDatasets;
};

export { getData, processData };
