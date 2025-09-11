import type {
	ConfirmedSignatureInfo,
	ParsedTransactionWithMeta,
} from '@solana/web3.js';

export interface SignatureWithTransaction extends ConfirmedSignatureInfo {
	transaction: ParsedTransactionWithMeta;
}
