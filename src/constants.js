const usConfirmed =
  "https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv";
const usDeaths =
  "https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv";

const oneDay = 1000 * 60 * 60 * 24;
const queryOptions = { cacheTime: oneDay, staleTime: oneDay };

export { usConfirmed, usDeaths, queryOptions };
