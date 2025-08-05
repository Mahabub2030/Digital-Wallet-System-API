import { Schema, model } from 'mongoose';

export const transactionTypes = {
  SEND: "send",
  WITHDRAW: "withdraw",
  DEPOSIT: "deposit",
} as const;

export type TransactionType = typeof transactionTypes;

export interface ITransaction {
  sender: string; // user ID
  receiver?: string; // user ID
  amount: number;
  type: TransactionType;
  status: 'success' | 'failed' | 'pending';
}


const transactionSchema = new Schema<ITransaction>(
  {
    sender: { type: String, required: true },
    receiver: { type: String },
    amount: { type: Number, required: true },
    type: { type: String, enum: transactionTypes, required: true },
    status: { type: String, enum: ['success', 'failed', 'pending'], default: 'success' },
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
