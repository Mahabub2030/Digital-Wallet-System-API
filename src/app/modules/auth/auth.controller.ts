import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../utils/catchAsync';
import passport from 'passport';
import AppError from '../../errorHelpers/AppError';
import { sendResponse } from '../../../utils/sendResponse';
import httpStatus from "http-status-codes"
import { createUserTokens } from '../../../utils/userTokens';
import { setAuthCookie } from '../../../utils/setCookie';



 const credentialsLogin = catchAsync(async  (req :Request, res :Response, next:NextFunction) => {
    passport.authenticate("local", async(err:any,user: any, info:any) =>{
        if(err){
            return next ( new AppError(401,err))
        }
          if (!user) {
            // console.log("from !user");
            // return new AppError(401, info.message)
            return next(new AppError(401, info.message))
        }

        const userTokens = await createUserTokens(user)

        // delete user.toObject().password

        const { password: pass, ...rest } = user.toObject()


        setAuthCookie(res, userTokens)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest

            },
        })
    })(req, res, next)
  
    
});

export const AuthControllers = {credentialsLogin}