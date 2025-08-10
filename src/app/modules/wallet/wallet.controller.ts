import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";

import httpStatusCode from "http-status-codes";
import { toggleWalletBlockService} from "./wallet.service";
import { Wallet } from "./wallet.model";

const getWallet = async <IWallet>(req: Request, res: Response) => {

  const userId = req.params.body;
  const wallet = await Wallet.findOne({ userId });

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "Wallet fetched successfully",
    data: wallet,
  });
};

export const toggleWalletBlock = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    const wallet = await toggleWalletBlockService(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "Wallet blocked status toggled successfully",
      data: wallet,
    });
  }
);

const addedMoney = catchAsync(async (req, res,tx:any) => {
  const userId = req.body;

  const amount = Number(req.body.amount);
  const { wallet, tx } = await WalletService.deposit(
    tx,
    amount,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "Wallet blocked status toggled successfully",
    data: wallet,
  });
});

export const walletControler = {
  getWallet,
  addedMoney,
  toggleWalletBlock,
};
