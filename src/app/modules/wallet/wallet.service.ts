import { Request } from "express";
import { Wallet } from "./wallet.model";
import { sendResponse } from "../../../utils/sendResponse";

import httpStatusCode from "http-status-codes";
import { Transaction } from "../transaction/transaction.interface";
import { ClientSession, Types } from "mongoose";

const getTransactionId = () => {
  return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};
const trnasactionId = getTransactionId();

const getWallet = async () => {
  return {};
};

const updateWallet = async () => {
  return {};
};

const addedMoney = async (userId: string, amount: number) => {
  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Amount must be postive");
  }

  const session = await Wallet.startSession();

  try {
    session.startTransaction();
    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet) throw new Error("Wallet not Found");
    if (wallet.isBlocked) throw new Error("Wallet is Bloked");

    wallet.balance += amount;
    await wallet.save({ session });

    await Transaction.create(
      [
        {
          type: "deposit",
          amount,
          sender: userId,
          receiver: wallet._id.toString(),
          status: "success",
        },
      ],
      { session }
    );
    await session.commitTransaction();
    return { wallet };
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
  } finally {
    session.endSession();
  }
};

const WithdrawMony = async (userId: string, amount: number) => {
     if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Amount must be postive");
  }

  const session = await Wallet.startSession();
  try {
    session.startTransaction();
    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet) throw new Error("Wallet not Found");
    if (wallet.isBlocked) throw new Error("Wallet is Bloked");
    wallet.balance -= amount;
     await wallet.save({ session });

      await Transaction.create(
      [
        {
          type: "withdraw",
          amount,
          sender: userId,
          receiver: wallet._id.toString(),
          status: "success",
        },
      ],
      { session }
      
    );
        await session.commitTransaction();

        return { wallet };
  } catch (error) {
     await session.abortTransaction();
     console.log(error);
    
  }finally {
    session.endSession();
  }
 
};

const sendMony = async (senderId: string, receiverId: string, amount: number)=> {
 if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Amount must be positive");
  }

 const session: ClientSession = await Wallet.startSession();
try {
     session.startTransaction();


     const senderWallet = await Wallet.findOne({userId:new Types.ObjectId(senderId)}).session(session)
     
     if (!senderWallet) throw new Error("Sender wallet not found");

       const receiverWallet = await Wallet.findOne({  userId: new Types.ObjectId(receiverId), })
      .session(session)
       if (!receiverWallet) throw new Error("Receiver wallet not found");
        // Check sender balance
    if (senderWallet.balance < amount) {
      throw new Error("Insufficient balance");
    }
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;


await senderWallet.save({ session });
    await receiverWallet.save({ session });
 
   // Create transaction
     // Log transaction
    await Transaction.create(
      [
        {
          txType: "send",
          amount,
          from: senderWallet._id,
          to: receiverWallet._id,
          initiatedBy: new Types.ObjectId(senderId),
          status: "completed",
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return { senderWallet, receiverWallet };

} catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

};
// for admin
const setBlockWallet = async () => {
  return {};
};

const unblockWallet = async () => {
  return {};
};

// for aggent
const CashInMony = async () => {
  return {};
};
const CashOutMony = async () => {
  return {};
};

export const WalletService = {
  addedMoney,
  WithdrawMony,
  sendMony
};
