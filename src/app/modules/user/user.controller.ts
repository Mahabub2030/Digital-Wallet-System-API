import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { verifyToken } from "../../../jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { WallerServices } from "../wallet/wallet.service";
import { Wallet } from "../wallet/wallet.model";


const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const user = await UserService.createUser(req.body);
    await Wallet.create({
      userId: user._id,
      balance: 50,
    });

    sendResponse(res,{
    success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
})


const UpdateUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const userId = req.params.id
    const token = req.headers.authorization
    const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload
    const payload= req.body
    const user = await UserService.updateUser(userId,payload,verifiedToken)
    sendResponse(res,{
    success: true,
        statusCode: httpStatus.CREATED,
        message: "User Update  Successfully",
        data: user,
    })
})








const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{


    const query = req.query;
    const result = await UserService.getAllUsers(query as Record <string, string>)
     sendResponse(res,{
    success: true,
        statusCode: httpStatus.CREATED,
        message: "GetAllUsers Successfully✅",
       data: result,
        meta: result.meta
    })
   
})


export const UserControllers = {
    createUser,
    getAllUsers,
    UpdateUser
   
}