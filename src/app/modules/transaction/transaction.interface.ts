import { Schema, Types, model } from 'mongoose';

export const transactionTypes = {
  SEND: "send",
  WITHDRAW: "withdraw",
  DEPOSIT: "deposit",
} as const;
export type TxType = "deposit"|"withdraw"|"transfer"|"cash_in"|"cash_out";
export type TxStatus ="pending"|"completed"|"failed"|"reversed"

export type TransactionType = typeof transactionTypes;

export interface ITransaction {
  sender: string; // user ID
  receiver?: string; // user ID
  amount: number;
  type: TransactionType;
  status: 'success' | 'failed' | 'pending';
}
export interface ITransaction extends Document{
  txTpye:TxStatus
  amount:number;
  fee?:number;
  commission?:number;
  from?:Types.ObjectId;
  to?:Types.ObjectId;
  initiedBy:Types.ObjectId
  Status:TxStatus;
  meta?:any;
  createdAt:Date;
}

export const txSchema = new Schema<ITransaction>(
  {
    txTpye:{type:String, required:true},
    amount:{type:Number,required:true},
    fee:{type:Number,default:0},
    commission:{type:Number,default:0},
    from:{type:Schema.Types.ObjectId,ref:"Wallet"},
    initiedBy:{type:Schema.Types.ObjectId,ref:"User"},
    Status:{type:String, default:"completed"},
    meta:{type:Schema.Types.Mixed},
    createdAt:{type:Date, default:Date.now}
  }
)

const transactionSchema = new Schema<ITransaction>(
  {
    sender: { type: String, required: true },
    receiver: { type: String },
    amount: { type: Number, required: true },
    type: { type: String, enum: transactionTypes, required: true },
    status: { type: String, default: 'success' },
  },
  { timestamps: true,versionKey:false }
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema);
