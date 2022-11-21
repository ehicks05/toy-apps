import { PublicKey } from '@solana/web3.js';

export const shorten = (input: string) =>
  `${input.slice(0, 4)}..${input.slice(-4)}`;

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
