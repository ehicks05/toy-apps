import { withDefault, NumberParam } from 'use-query-params';

export const DEFAULTS = {
  lat: 40.5647,
  long: -74.7,
} as const;

export const QUERY_PARAMS = {
  lat: withDefault(NumberParam, DEFAULTS.lat),
  long: withDefault(NumberParam, DEFAULTS.long),
};
