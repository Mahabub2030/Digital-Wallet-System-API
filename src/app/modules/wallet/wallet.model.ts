import { model, Schema, Types } from "mongoose";
import { WalletSchema } from "./wallet.Insterface";


export interface IWallet extends Document {
  userId: Types.ObjectId;
  balance ?: number;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}



export const Wallet = model<IWallet>('Wallet', WalletSchema);
