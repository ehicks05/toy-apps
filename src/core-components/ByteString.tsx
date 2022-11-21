import { PublicKey } from '@solana/web3.js';

export const shorten = (input: string) =>
  `${input.slice(0, 4)}..${input.slice(-4)}`;

const ByteString = ({ input }: { input: PublicKey | string }) => {
  const content = typeof input === 'string' ? input : input.toBase58();
  return <span className="font-mono">{shorten(content)}</span>;
};

export default ByteString;
