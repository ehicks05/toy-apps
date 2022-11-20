import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const nf = new Intl.NumberFormat();
export const shorten = (input: string) =>
  `${input.slice(0, 4)}..${input.slice(-4)}`;

export const toSol = (lamports: number) =>
  nf.format(lamports / LAMPORTS_PER_SOL);

export const blockTimeToISO = (blockTime = 0) =>
  new Date(blockTime * 1000).toISOString();
