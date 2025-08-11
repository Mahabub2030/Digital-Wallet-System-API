import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";

import httpStatusCode from "http-status-codes";
import { Wallet } from "./wallet.model";
import { WalletService } from "./wallet.service";


const getWallet =catchAsync (async (req: Request, res: Response) => {
  const userId = req.params.body;
  const wallet = await Wallet.findOne({ userId });


  
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "Wallet fetched successfully",
    data: wallet,
  });
});
const AddWallet =catchAsync (async (req: Request, res: Response) => {
  const userId = req.params.body;
  const wallet = await Wallet.findOne({ userId });


  
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "Wallet fetched successfully",
    data: wallet,
  });
});

//  const toggleWalletBlock = catchAsync(
//   async (req: Request, res: Response) => {
//     const userId = req.user?.id;
//     if (!userId) {
//       res.status(401).json({ message: "Unauthorized access" });
//       return;
//     }
//     const wallet = await toggleWalletBlock(userId);


//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatusCode.OK,
//       message: "Wallet blocked status toggled successfully",
//       data: wallet,
//     });
//   }
// );

const addedMoney = catchAsync(async (req, res,tx:any) => {
  const userId = req.body;
  const amount = Number(req.body.amount);
  const { wallet} = await WalletService.addedMoney(
    tx,
    amount
  );



  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: " Added mony successfully",
    data: wallet,
  });
});

export const walletControler = {
  getWallet,
  addedMoney,
  toggleWalletBlock,
};
