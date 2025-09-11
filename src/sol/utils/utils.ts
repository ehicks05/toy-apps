import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const nf = new Intl.NumberFormat();

export const toSol = (lamports: number) =>
  nf.format(lamports / LAMPORTS_PER_SOL);

export const isSolId = (input: string) => {
  return input.length >= 32 && input.length < 45 && !input.includes(' ');
};

export const shorten = (input: string) =>
  `${input.slice(0, 4)}..${input.slice(-4)}`;

export const shortenRecur = (input: unknown): unknown => {
  if (!input) return input;

  if (Array.isArray(input)) {
    return input.map((o) => shorten(o));
  }
  if (typeof input === 'string') {
    if (isSolId(input)) return shorten(input);
  }

  if (typeof input === 'object') {
    return Object.fromEntries(
      Object.entries(input).map(([k, v]) => {
        return [k, shortenRecur(v)];
      }),
    );
  }

  return input;
};

export const splitShorten = (input: string) => {
  return input
    .split(' ')
    .map((o) => (isSolId(o) ? shorten(o) : o))
    .join(' ');
};
