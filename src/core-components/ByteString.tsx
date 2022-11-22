import { PublicKey } from '@solana/web3.js';
import { inRange } from 'lodash';

export const isSolId = (input: string) => {
  return inRange(input.length, 32, 45) && !input.includes(' ');
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

const ByteString = ({ input }: { input: PublicKey | string }) => {
  const content = typeof input === 'string' ? input : input.toBase58();
  return (
    <a
      className="font-mono"
      href={`https://explorer.solana.com/address/${input}?cluster=devnet`}
      referrerPolicy="no-referrer"
      rel="noreferrer"
      target={'_blank'}
    >
      {shorten(content)}
    </a>
  );
};

export default ByteString;
