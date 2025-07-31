import Transaction, { ITransaction } from "./transaction.model";

export const TransactionService = {
  async getUserTransactions(userId: string) {
    return await Transaction.find({ initiatedBy: userId })
      .populate("walletId", "balance")
      .populate("receiverWalletId", "balance")
      .sort({ createdAt: -1 });
  },

  async createTransaction(payload: Partial<ITransaction>) {
    const transaction = new Transaction(payload);
    return await transaction.save();
  },
};
