import { Request, Response, NextFunction } from "express";
import { TransactionService } from "./transaction.service";

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id; // assuming auth middleware adds user to req
    const transactions = await TransactionService.getUserTransactions(userId!);
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    next(error);
  }
};
