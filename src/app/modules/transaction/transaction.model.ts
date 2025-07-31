// src/modules/transaction/transaction.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export type TransactionType = "top-up" | "withdraw" | "send" | "cash-in" | "cash-out";

export interface ITransaction extends Document {
  walletId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  fee?: number;
  commission?: number;
  initiatedBy: Types.ObjectId;
  receiverWalletId?: Types.ObjectId;
  status: "pending" | "completed" | "reversed";
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
  type: { type: String, enum: ["top-up", "withdraw", "send", "cash-in", "cash-out"], required: true },
  amount: { type: Number, required: true },
  fee: { type: Number, default: 0 },
  commission: { type: Number, default: 0 },
  initiatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverWalletId: { type: Schema.Types.ObjectId, ref: "Wallet" },
  status: { type: String, enum: ["pending", "completed", "reversed"], default: "completed" },
}, { timestamps: true });

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
