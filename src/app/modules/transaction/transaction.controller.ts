import { Request } from "express";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { TransactionService } from "./transaction.service";



const AddMoney = async (req: Request, res: Response) => {
  try {
    const amountData = req.body; // whatever the client sends
    const addMoney = await TransactionService.AddMoneycreate(amountData); // ✅ pass the data

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Money Added successfully',
      data: addMoney,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// POST /transaction/deposit
const depositMoney =  (async (req: Request, res: Response ) => {

    
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

export const TransactionControlers ={
  AddMoney,
 

}