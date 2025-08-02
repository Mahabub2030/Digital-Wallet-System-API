
import { Wallet } from '../wallet/wallet.model';
import mongoose from 'mongoose';
import { transactionTypes } from './transaction.interface';
import { Transaction } from './transaction.model';

export const TransactionService = {
  async sendMoney(fromUserId: string, toUserId: string, amount: number) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const senderWallet = await Wallet.findOne({ user: fromUserId }).session(session);
      const receiverWallet = await Wallet.findOne({ user: toUserId }).session(session);

      if (!senderWallet || !receiverWallet) throw new Error('Wallets not found');
      if (senderWallet.balance < amount) throw new Error('Insufficient balance');

      senderWallet.balance -= amount;
      receiverWallet.balance += amount;

      await senderWallet.save({ session });
      await receiverWallet.save({ session });

      const transaction = await Transaction.create(
        [{ type: transactionTypes, amount, from: fromUserId, to: toUserId }],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return transaction[0];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  async deposit(userId: string, amount: number) {
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) throw new Error('Wallet not found');

    wallet.balance += amount;
    await wallet.save();

    return Transaction.create({ type: TransactionType.DEPOSIT, amount, to: userId });
  },

  async withdraw(userId: string, amount: number) {
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) throw new Error('Wallet not found');
    if (wallet.balance < amount) throw new Error('Insufficient balance');

    wallet.balance -= amount;
    await wallet.save();

    return Transaction.create({ type: transactionTypes.WITHDRAW, amount, from: userId });
  },

  async getMyTransactions(userId: string) {
    return Transaction.find({ $or: [{ from: userId }, { to: userId }] })
      .sort({ createdAt: -1 })
      .populate('from to', 'name');
  },
};
