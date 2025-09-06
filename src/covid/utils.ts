import { format, subDays } from "date-fns";
import { groupBy, keyBy, partition, toMerged } from "es-toolkit";
import { INFECTION_DURATION, STATES } from "./constants";
import type { County } from "./types";

const usaStates = keyBy(STATES, (e) => e.name);

export const getLocationDisplayName = ({ Admin2, Province_State }: { Admin2: string; Province_State: string }) => {
  if (!Admin2 && !Province_State) return 'undefined';
  const state = usaStates[Province_State]?.abbreviation || Province_State;
  return `${Admin2 ? `${Admin2}, ` : ""}${state}`;
};

const numberFormat = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export const pretty = (input: number) => numberFormat.format(input);
const dateRegex = /\d+\/\d+\/\d+/g;

const processData = (merged: { confirmedRow: County, deathsRow: County }[], UIDs: number[]) => {
  // split each row into a row-per-date that includes the combined metadata from each file,
  // along with the confirmed and deaths counts for that date.
  const mergedAndSplit = merged
    .filter((sets) => UIDs.includes(sets.confirmedRow.UID))
    .flatMap(({ confirmedRow, deathsRow }) => {
      const [confirmedDates, confirmedRawMetadata] = partition(
        Object.entries(confirmedRow),
        (r) => r[0].match(dateRegex) !== null
      );
      const confirmedMetadata = confirmedRawMetadata.reduce(
        (acc, cur) => ({ ...acc, [cur[0]]: cur[1] }),
        {}
      );

      const [deathsDates, deathsRawMetadata] = partition(
        Object.entries(deathsRow),
        (r) => r[0].match(dateRegex) !== null
      );
      const deathsMetadata = deathsRawMetadata.reduce(
        (acc, cur) => ({ ...acc, [cur[0]]: cur[1] }),
        {}
      );

      const mergedMetadata = toMerged(confirmedMetadata, deathsMetadata);

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
    });

  // object keyed by date, each date points to an array
  // with a row for each county
  const byDate = groupBy(mergedAndSplit, o => o.date);

  const byDateByUID = Object.fromEntries(
    Object.entries(byDate).map((entry) => [entry[0], keyBy(entry[1], o => o.UID)])
  );

  const values = Object.values(Object.values(byDateByUID));

  return values.reverse();
};

export { processData };
