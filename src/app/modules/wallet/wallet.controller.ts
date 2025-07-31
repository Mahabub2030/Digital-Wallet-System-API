import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { WalletService } from "./wallet.service";
import { sendResponse } from "../../../utils/sendResponse";
import { IWallet, Wallet } from "./wallet.model";

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
      const payload: IWallet = req.body;
      const result = await WalletService.createWallet(payload);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }

})

export const WalletController = {
  depositMoney,
  createWallet
};
