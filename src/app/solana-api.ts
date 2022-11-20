import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { WalletContextState } from '@solana/wallet-adapter-react';
import {
  Transaction,
  SystemProgram,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Connection,
} from '@solana/web3.js';

export const handleSendToRandomAddress = async (
  connection: Connection,
  publicKey: PublicKey | null,
  sendTransaction: WalletContextState['sendTransaction'],
) => {
  if (!publicKey) throw new WalletNotConnectedError();

  const lamports = await connection.getMinimumBalanceForRentExemption(0);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      lamports,
      toPubkey: Keypair.generate().publicKey,
    }),
  );

  const {
    context: { slot: minContextSlot },
    value: { blockhash, lastValidBlockHeight },
  } = await connection.getLatestBlockhashAndContext();

  const signature = await sendTransaction(transaction, connection, {
    minContextSlot,
  });

  await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature,
  });
};

export const requestAirdrop = async (
  connection: Connection,
  publicKey: PublicKey | null,
) => {
  if (!publicKey) return;
  try {
    await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
  } catch (e) {
    console.log(e);
  }
};
