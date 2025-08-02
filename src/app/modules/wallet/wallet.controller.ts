import { Request ,Response} from "express";
import { sendResponse } from "../../../utils/sendResponse";

import httpStatus from "http-status-codes"
import AppError from "../../errorHelpers/AppError";
import { Wallet } from "./wallet.model";

const getMyWallet = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log('Controller - req.user:', req.user);
  console.log(userId)

  if (!userId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not authenticated');
  }

  const wallet = await Wallet.findOne({ userId });
  console.log(wallet)

  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Get My Wallet Successfully✅",
    data: wallet,
  });
};


export const WalletController ={
  getMyWallet
}

