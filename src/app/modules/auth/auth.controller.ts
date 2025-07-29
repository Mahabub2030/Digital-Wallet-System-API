import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { info } from "pdfkit";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes"

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  if (!user) {
            // console.log("from !user");
            // return new AppError(401, info.message)
            return next(new Error(401, ))
        }
   sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: {
              
                user: rest

            },
        })
    })(req, res, next)


})