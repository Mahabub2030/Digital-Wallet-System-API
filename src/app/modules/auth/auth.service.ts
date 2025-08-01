

import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"
import httpstatuscode from 'http-status-codes'


const credentialsLogin = async (payload:Partial<IUser>)=>{
    const {email, password} = payload;

    const isUserExist = await User.findOne({email})

    if(!isUserExist){
        throw new AppError(httpstatuscode.CREATED,"Creadansthial login")
    }



    const isPasswordMatched = await bcryptjs.compare(password as string ,isUserExist.password as string)
    if(!isPasswordMatched){
        throw new Error("Password is Not Correct ")
    }
    return {
        email:isUserExist.email
    }
}

export const AuthServices ={
    credentialsLogin
}