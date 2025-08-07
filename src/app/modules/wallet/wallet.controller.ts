import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";

import httpStatusCode  from "http-status-codes";
import { toggleWalletBlockService, WallerServices } from "./wallet.service";


 const getMyWallet = catchAsync(async (req: Request, res: Response, next: NextFunction ) => {
  const userId  = req.user?.userId 
  const wallet = await WallerServices.getWalletByUserId(req.user?.userId);


  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: 'Wallet fetched successfully',
    data: wallet,
  });
});







export const toggleWalletBlock = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized access' });
    return;
  }

  const wallet = await toggleWalletBlockService(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: 'Wallet blocked status toggled successfully',
    data: wallet,
  });
});

export const walletControler={
  getMyWallet,
  toggleWalletBlock
}