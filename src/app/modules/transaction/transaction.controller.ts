import { Request } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";


import httpStatus from "http-status-codes";
import { createTransactionServices } from "./transaction.service";


// POST /transaction/deposit
export const depositMoney =  (async (req: Request, res: Response ) => {

    
  const userId = req.user?.id; // Use optional chaining in case `user` is undefined

  const { amount } = req.body;

  if (!userId) {
    throw new Error("Unauthorized: User ID not found");
  }

  const result = await createTransactionServices.depositMoney(userId, amount); // Call using TransactionService

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Money deposited successfully',
    data: result,
  });
});