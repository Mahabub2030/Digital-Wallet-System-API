import { NextFunction, Request, Response } from "express";
import { Wallet } from "./wallet.model";
import { sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";

import httpStatusCode  from "http-status-codes";
import { WallerServices } from "./wallet.service";


 export const getMyWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId :any = req.user?.id
  const wallet = await WallerServices.getWalletByUserId(req.user?.userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: 'Wallet fetched successfully',
    data: wallet,
  });
});

const toggleWalletBlock = async (req: Request, res: Response) => {

  const userId :any = req.user?.id
  const wallet = await Wallet.findById(userId);
//   console.log(wallet)
//   if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

//   wallet.blocked = !wallet.blocked;
//   await wallet.save();

 sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: 'Wallet Bloked successfully',
    data: wallet,
  });
};

export const  walletControler = {
toggleWalletBlock
}