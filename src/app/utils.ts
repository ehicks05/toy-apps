import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export const nf = new Intl.NumberFormat();

export const toSol = (lamports: number) =>
  nf.format(lamports / LAMPORTS_PER_SOL);

export const blockTimeToISO = (blockTime = 0) =>
  new Date(blockTime * 1000).toISOString();
