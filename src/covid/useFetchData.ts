import { useQuery } from "@tanstack/react-query";
import { keyBy } from "es-toolkit";
import Papa from "papaparse";
import { usConfirmedUrl, usDeathsUrl } from "./constants";
import type { County } from "./types";

const toFetch = async (url: string) => (await fetch(url)).text()
const toParsedCsv = async (csv: string) => Papa.parse<County>(csv, { header: true }).data;

const queryFn = async () => {
  const [confirmedData, deathsData] = await Promise.all(
    [usConfirmedUrl, usDeathsUrl]
      .map(toFetch)
      .map(async (csv) => toParsedCsv(await csv))
  );
  console.log("CSVs fetched and parsed");

  const countyArray = deathsData.map(row => ({
    UID: row.UID,
    iso2: row.iso2,
    iso3: row.iso3,
    code3: row.code3,
    FIPS: row.FIPS,
    Admin2: row.Admin2,
    Province_State: row.Province_State,
    Country_Region: row.Country_Region,
    Lat: row.Lat,
    Long_: row.Long_,
    Combined_Key: row.Combined_Key,
    Population: row.Population,
  }));

  const counties = keyBy(countyArray, o => o.UID);

  // take each confirmed row and match it to the deaths row for the same municipality
  const mergedData = confirmedData.map((confirmedRow) => {
    const deathsRow = deathsData.find((d) => d.UID === confirmedRow.UID);
    return { confirmedRow, deathsRow };
  });// so now we have a bunch of rows like this:
		/*
  
  {
    confirmedRow: {uid: 123, ...},
    deathsRow: {uid: 123, ...},
  }[]

  */

		// desired shape would be:
		/*
  
  [{
    '10/10/2020': [
    {
      UID: 123,
      date: '10/10/2020',
      active: 0,
      activePercent: 0,
      confirmed: 0,
      confirmedPercent: 0,
      deaths: 0,
      deathsPercent: 0,
    },
    {
      UID: 234,
      date: '10/10/2020',
      active: 0,
      activePercent: 0,
      confirmed: 0,
      confirmedPercent: 0,
      deaths: 0,
      deathsPercent: 0,
    },
    ]
  }]


   */

		return { counties, mergedData };
};



export const useFetchData = () => {
  return useQuery({ queryKey: ['usData'], queryFn, staleTime: Number.POSITIVE_INFINITY });
}