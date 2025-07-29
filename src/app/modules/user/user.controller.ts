import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { UserService } from "./user.service";
import httpStatus from "http-status-codes";

const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const user = await UserService.createUser(req.body)
    sendResponse(res,{
    success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
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
   
}