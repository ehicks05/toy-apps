import React, { useEffect, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { AccountInfo, ParsedAccountData, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const TOKEN_ACCOUNT_SIZE = 165;

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
      const filters = {
        filters: [
          { dataSize: TOKEN_ACCOUNT_SIZE },
          {
            memcmp: {
              bytes: publicKey.toBase58(),
              offset: 32,
            },
          },
          // GET A SPECIFIC MINT
          // {
          //   memcmp: {
          //     bytes: MINT_TO_SEARCH, //base58 encoded string
          //     offset: 0, //number of bytes
          //   },
          // },
        ],
      };
      const tokenAccounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        filters,
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
