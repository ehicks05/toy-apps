import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
import { ConfirmedSignatureInfo, PublicKey } from '@solana/web3.js';
import React, { useState } from 'react';
import { Button } from '../core-components';
import { SignatureWithTransaction } from '../types/types';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import {
  handleSendToRandomAddress,
  requestAirdrop,
} from '../services/solana-web3-api';
import { TbRefresh } from 'react-icons/tb';
import { toSol } from '../utils/utils';
import Nfts from './Nfts';

export const Demo = () => {
  const { connection } = useConnection();
  const { publicKey: walletPK, sendTransaction } = useWallet();
  const [readOnlyPK, setReadOnlyPK] = useState("7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV");

  let publicKey = walletPK;
  
  if (!publicKey) {
    try {
      publicKey = new PublicKey(readOnlyPK);
    } catch (e) {
      console.log(e)
    }
  }

  const [balance, setBalance] = useState(0);
  const [signatures, setSignatures] = useState<ConfirmedSignatureInfo[]>();
  const [parsedTransactions, setParsedTransactions] =
    useState<SignatureWithTransaction[]>([]);

  const getBalance = async () => {
    const balance = publicKey ? await connection.getBalance(publicKey) : 0;
    setBalance(balance);
  };

  const getSignatures = async () => {
    const signatures = publicKey
      ? await connection.getSignaturesForAddress(publicKey)
      : [];
    setSignatures(signatures);
  };

  const getParsedTransactions = async () => {
    if (!publicKey || !signatures) {
      setParsedTransactions([]);
      return;
    }

    const slice = signatures.slice(0, 1);

    const parsedTransactions = await connection.getParsedTransactions(
      slice.map((o) => o.signature),
    );
    setParsedTransactions(
      slice.map((signature, i) => ({
        ...signature,
        transaction: parsedTransactions[i]!,
      })),
    );
  };

  const handleRequestAirdrop = async () => {
    await requestAirdrop(connection, publicKey);
    await getBalance();
    await getSignatures();
    await getParsedTransactions();
  };

  return (
    <div className="m-auto flex max-w-screen-xl flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <WalletMultiButton disabled={!!readOnlyPK} />
        <WalletDisconnectButton disabled={!!readOnlyPK} />
        <input className='rounded px-6 h-12 w-full bg-[#512da8] font-semibold'
          disabled={!!walletPK}
          value={readOnlyPK}
          onChange={(e) => setReadOnlyPK(e.target.value)} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            className="wallet-adapter-button wallet-adapter-button-trigger"
            disabled={!publicKey}
            onClick={getBalance}
            >
            <div className="flex items-center gap-2">
              <TbRefresh size={24} />
              Get Balance
            </div>
          </Button>
          <Button
            className="wallet-adapter-button wallet-adapter-button-trigger"
            disabled={!publicKey}
            onClick={getSignatures}
            >
            <div className="flex items-center gap-2">
              <TbRefresh size={24} />
              Get Signatures
            </div>
          </Button>
          <Button
            className="wallet-adapter-button wallet-adapter-button-trigger"
            disabled={!publicKey || !signatures}
            onClick={getParsedTransactions}
            >
            <div className="flex items-center gap-2">
              <TbRefresh size={24} />
              Get Transactions
            </div>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            className="wallet-adapter-button wallet-adapter-button-trigger"
            disabled={!publicKey}
            onClick={() =>
              handleSendToRandomAddress(connection, publicKey, sendTransaction)
            }
            >
            Send SOL to a rand address
          </Button>
          <Button
            className="wallet-adapter-button wallet-adapter-button-trigger"
            disabled={!publicKey}
            onClick={handleRequestAirdrop}
            >
            Request Airdrop
          </Button>
        </div>
      </div>
      <div className="bg-sky-800 p-4 font-bold">
        PK: {publicKey?.toBase58()}
      </div>
      <div className="bg-sky-800 p-4 font-bold">
        Balance: {toSol(balance)} Sol
      </div>

      
      Note: only able to fetch one transaction atm.
      <TransactionHistory transactions={parsedTransactions} />

      {publicKey && <Nfts publicKey={publicKey} />}
    </div>
  );
};
