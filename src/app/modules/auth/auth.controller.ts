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
import { AuthServices } from './auth.service';

 const credentialsLogin = catchAsync(async  (req :Request, res :Response, next:NextFunction) => {
        
const loginInfo = await AuthServices.credentialsLogin(req.body)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: loginInfo,
        })
    })
  

export const AuthControllers = {credentialsLogin}