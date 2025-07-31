import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { WalletService } from "./wallet.service";
import { sendResponse } from "../../../utils/sendResponse";
import { IWallet, Wallet } from "./wallet.model";

import httpStatus from "http-status-codes";

const depositMoney = catchAsync(async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  const result = await WalletService.deposit(userId, amount);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Deposit successful",
    data: result,
  });
});

const createWallet = catchAsync(async(req:Request,res:Response,next:NextFunction) =>{
    try {
      
      const result = await WalletService.createWallet(req.body);
      
  sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Wallet Created Successfully",
        data: result,
    })

    } catch (error) {
      next(error);
    }

})

export const WalletController = {
  depositMoney,
  createWallet
};
