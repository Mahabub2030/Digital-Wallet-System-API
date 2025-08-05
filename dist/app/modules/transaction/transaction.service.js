"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const wallet_model_1 = require("../wallet/wallet.model");
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_interface_1 = require("./transaction.interface");
const transaction_model_1 = require("./transaction.model");
exports.TransactionService = {
    async sendMoney(fromUserId, toUserId, amount) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const senderWallet = await wallet_model_1.Wallet.findOne({ user: fromUserId }).session(session);
            const receiverWallet = await wallet_model_1.Wallet.findOne({ user: toUserId }).session(session);
            if (!senderWallet || !receiverWallet)
                throw new Error('Wallets not found');
            if (senderWallet.balance < amount)
                throw new Error('Insufficient balance');
            senderWallet.balance -= amount;
            receiverWallet.balance += amount;
            await senderWallet.save({ session });
            await receiverWallet.save({ session });
            const transaction = await transaction_model_1.Transaction.create([{ type: transaction_interface_1.transactionTypes, amount, from: fromUserId, to: toUserId }], { session });
            await session.commitTransaction();
            session.endSession();
            return transaction[0];
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    },
    async deposit(userId, amount) {
        const wallet = await wallet_model_1.Wallet.findOne({ user: userId });
        if (!wallet)
            throw new Error('Wallet not found');
        wallet.balance += amount;
        await wallet.save();
        return transaction_model_1.Transaction.create({ type: TransactionType.DEPOSIT, amount, to: userId });
    },
    async withdraw(userId, amount) {
        const wallet = await wallet_model_1.Wallet.findOne({ user: userId });
        if (!wallet)
            throw new Error('Wallet not found');
        if (wallet.balance < amount)
            throw new Error('Insufficient balance');
        wallet.balance -= amount;
        await wallet.save();
        return transaction_model_1.Transaction.create({ type: transaction_interface_1.transactionTypes.WITHDRAW, amount, from: userId });
    },
    async getMyTransactions(userId) {
        return transaction_model_1.Transaction.find({ $or: [{ from: userId }, { to: userId }] })
            .sort({ createdAt: -1 })
            .populate('from to', 'name');
    },
};
