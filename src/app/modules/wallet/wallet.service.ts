import { Request, Response } from "express";
import { Types } from "mongoose";
import { catchAsync } from "../../../utils/catchAsync";
import { IWallet, Wallet } from "./wallet.model";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import httpStatusCode from "http-status-codes"

const getWalletByUserId = async (userId: Types.ObjectId) => {
  return await Wallet.findOne({ user: userId });
};

const addMoney = async (
  payload: Partial<IWallet>,
  userId: String,
  req: Request,
  res: Response
) => {
const user = await User.findById(userId)

if(!user?.isBlocked || !user.isDeteted){
  throw new AppError(httpStatusCode.BAD_REQUEST,"You are not allowed")
}

const AddMoney = await Wallet.create({
  user:userId
  ...payload
})

return {}

};







const WithdrawMoney = catchAsync(async (req: Request, res: Response) => {});
const SendMoney = catchAsync(async (req: Request, res: Response) => {});
const ViewTransaction = catchAsync(async (req: Request, res: Response) => {});

export const toggleWalletBlockService = async (userId: string) => {
  // Find wallet by user ID (not wallet _id)
  const wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  // Toggle the block status
  wallet.blocked = !wallet.blocked;

  // Save the updated wallet
  await wallet.save();

  return wallet;
};

export const WallerServices = {
  getWalletByUserId,
  addMoney,
  WithdrawMoney,
  SendMoney,
  ViewTransaction,
};
