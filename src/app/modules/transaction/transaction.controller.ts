import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { sendResponse } from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { TransactionService } from './transaction.service';

export const depositMoney = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { amount } = req.body;
  const result = await TransactionService.deposit(userId, amount);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Money deposited successfully',
    data: result,
  });
});

export const withdrawMoney = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { amount } = req.body;
  const result = await TransactionService.withdraw(userId, amount);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Money withdrawn successfully',
    data: result,
  });
});

export const sendMoney = catchAsync(async (req: Request, res: Response) => {
  const senderId = req.user!.id;
  const { receiverPhone, amount } = req.body;
  const result = await TransactionService.send(senderId, receiverPhone, amount);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Money sent successfully',
    data: result,
  });
});

export const getTransactionHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await TransactionService.getHistory(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Transaction history retrieved successfully',
    data: result,
  });
});
