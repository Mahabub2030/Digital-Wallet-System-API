import { session } from "passport";
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { Wallet } from "../wallet/wallet.model";
import { ITransaction, Transaction } from "./transaction.interface";
import httpStatus from "http-status-codes"
import { Request } from "express";


const AddMoneycreate = async (
  payload: Partial<ITransaction>,
  userId: String,
  res:Response,req:Request
) => {
const user = await User.findById(userId)
const {amount} = req.body

if(!user?.isBlocked || !user.isDeteted){
  throw new AppError(httpStatus.BAD_REQUEST,"You are not allowed")
}

 const wallet = await Wallet.findById({user:userId}).session(session)

 if(!wallet || wallet.isBlocked) {
  throw new  AppError (httpStatus.BAD_REQUEST,"your wallet blocked")
 }

 wallet.balance += amount;


const addMoney = await Transaction.create({
  user:userId,
  type:"add",
  amount,
  status:"pending",
  ...payload,
 
})

return  addMoney

};

export const TransactionService ={
  AddMoneycreate
}
