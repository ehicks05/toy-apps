import React, { useEffect, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

interface Props {
  publicKey: PublicKey;
}

const Nfts = ({ publicKey }: Props) => {
  const { connection } = useConnection();

  const [tokenAccounts, setTokenAccounts] = useState<
    {
      account: AccountInfo<Buffer | ParsedAccountData>;
      pubkey: PublicKey;
    }[]
  >();

  useEffect(() => {
    const doIt = async () => {
      const tokenAccounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        {
          filters: [
            {
              memcmp: {
                bytes: publicKey.toBase58(),
                offset: 32,
              },
            },
          ],
        },
      );
      setTokenAccounts(tokenAccounts);
    };

    if (publicKey) doIt();
  }, []);

  return (
    <div className="flex flex-col gap-2 bg-sky-800 p-2">
      SPL TOKEN STUFF
      <pre>{JSON.stringify(tokenAccounts, null, 2)}</pre>
    </div>
  );
};

export default Nfts;
