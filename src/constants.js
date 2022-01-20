const usConfirmedUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv";
const usDeathsUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv";

const INFECTION_DURATION = 14;

const POPULATIONS = {
  HUNTERDON: 124_371,
  SOMERSET: 328_934,
  NEW_JERSEY: 8_882_000,
  SUSSEX: 140_488,
  DELAWARE: 973_764,
};

const oneDay = 1000 * 60 * 60 * 24;
const queryOptions = { cacheTime: oneDay, staleTime: oneDay };

export {
  usConfirmedUrl,
  usDeathsUrl,
  INFECTION_DURATION,
  POPULATIONS,
  queryOptions,
};
