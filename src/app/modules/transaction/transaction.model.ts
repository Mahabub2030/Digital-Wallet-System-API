import { Schema, model } from 'mongoose';

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['deposit', 'withdraw', 'send'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'success',
    },
    method: {
      type: String,
      enum: ['wallet', 'bank', 'agent'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model('Transaction', transactionSchema);
