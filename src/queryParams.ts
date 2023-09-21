import { withDefault, NumberParam } from 'use-query-params';

export const DEFAULTS_NJ = {
  lat: 40.5647,
  long: -74.7,
} as const;
export const DEFAULTS = {
  lat: 44,
  long: -97,
} as const;

export const QUERY_PARAMS = {
  lat: withDefault(NumberParam, DEFAULTS.lat),
  long: withDefault(NumberParam, DEFAULTS.long),
};
