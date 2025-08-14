import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";

import httpStatusCode from "http-status-codes";
import { IWallet, Wallet } from "./wallet.model";
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
const getWallets =catchAsync (async (req: Request, res: Response) => {
  const wallet = await Wallet.find();

  
  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: " All Wallet fetched successfully",
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
interface AddedMoneyResult {
  wallet: IWallet;
}
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
  const userId = req.params.Id;
  const amount = Number(req.body.amount);
  const { wallet} = await WalletService.addedMoney(
    userId, amount
  );


  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: " Added mony successfully",
    data: wallet,
  });
});
const withdrawMoney = catchAsync(async (req, res,tx:any) => {
  const userId = req.params.Id;
  const amount = Number(req.body.amount);
  const { wallet} = await WalletService.WithdrawMony(
    userId, amount
  );


  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: " Money withdrawn successfully",
    data: wallet,
  });
});


const sendMoney = catchAsync(async (req, res) => {
  const senderId = req.params.senderId;
  const {receiver , amount } = req.body
  

 const result = await WalletService.sendMony(senderId, receiver, amount);

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "Money sent successfully",
    data: result,
  });
});




export const walletControler = {
  getWallet,
  getWallets,
  addedMoney,
  withdrawMoney,
  sendMoney
};
