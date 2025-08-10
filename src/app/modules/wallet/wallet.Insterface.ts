import { Schema } from "mongoose";
import { IWallet } from "./wallet.model";

 export const WalletSchema = new Schema<IWallet>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    balance: { type: Number, default: 50 },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

