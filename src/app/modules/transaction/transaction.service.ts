import mongoose from "mongoose";
import { ITransaction, Transaction, transactionTypes } from "./transaction.interface";
import { Wallet } from "../wallet/wallet.model";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createTransactionService = async (
  payload: Partial<ITransaction>,
  senderId: string,
  receiverId: string,
  amount: number,
  type: keyof typeof transactionTypes ,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderWallet = await Wallet.findOne({ user: senderId }).session(session);
    const receiverWallet = await Wallet.findOne({ user: receiverId }).session(session);

    if (!senderWallet || !receiverWallet) {
      throw new AppError(httpStatus.BAD_REQUEST, "One or both wallets not found");
    }

    if (senderWallet.balance < amount) {
      throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");
    }

    // Deduct from sender
    senderWallet.balance -= amount;

    // Add to receiver
    receiverWallet.balance += amount;

    // Save both wallets
    await senderWallet.save({ session });
    await receiverWallet.save({ session });

    // Create transaction record
    const transaction = await Transaction.create(
      [
        {
          type: type, // use the parameter passed
          amount,
          from: senderId,
          to: receiverId,
          ...payload,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return transaction[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction error:", error);
    throw error;
  }
};

export const  createTransactionServices ={
    createTransactionService,

};
