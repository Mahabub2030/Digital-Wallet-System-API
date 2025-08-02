import { model, Schema, Types } from "mongoose";


export interface IWallet extends Document {
  userId: Types.ObjectId;
  balance: number;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema<IWallet>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    balance: { type: Number, default: 50 },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const Wallet = model<IWallet>('Wallet', WalletSchema);
