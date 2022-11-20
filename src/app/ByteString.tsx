import { PublicKey } from '@solana/web3.js';
import { shorten } from './utils';

export const ByteString = ({ input }: { input: PublicKey | string }) => {
  const content = typeof input === 'string' ? input : input.toBase58();
  return <span className="font-mono">{shorten(content)}</span>;
};
