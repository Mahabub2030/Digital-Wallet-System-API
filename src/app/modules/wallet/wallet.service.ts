
import { IWallet, Wallet } from "./wallet.model";

const deposit = async (userId: string, amount: number) => {
  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  wallet.balance += amount;
  await wallet.save();

  return wallet;
};

const createWallet = async (payload: IWallet) => {
  const existingWallet = await Wallet.findOne({ userId: payload.userId });
  if (existingWallet) {
    throw new Error("A wallet already exists for this user.");
  }
  const result = await Wallet.create(payload);
  return result;
};

export const WalletService = {
  deposit,
  createWallet
};
