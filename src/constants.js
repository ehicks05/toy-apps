const usConfirmedUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv";
const usDeathsUrl =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv";

const INFECTION_DURATION = 14;

const oneDay = 1000 * 60 * 60 * 24;
const queryOptions = { cacheTime: oneDay, staleTime: oneDay };

export { usConfirmedUrl, usDeathsUrl, INFECTION_DURATION, queryOptions };
