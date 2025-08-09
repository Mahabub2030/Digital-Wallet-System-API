import { JwtPayload } from "jsonwebtoken";
import { QueryBuilder } from "../../../utils/QueryBuilder";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errorHelpers/AppError";
import bcryptjs from "bcryptjs"
import httpstatuscode from "http-status-codes";
import { envVars } from "../../config/env";

const createUser = async (paylode: Partial<IUser>) => {
  const { email, password,...rest } = paylode;

  const isUserExit = await User.findOne({ email });

  if (isUserExit) {
    throw new Error("User Already Exit");
  }

  const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

  const authProvider :IAuthProvider={
    provider:"credentials", providerId: email as string
  }
  const user = await User.create({
    email,
    password:hashedPassword,
    auths:[authProvider]
  });
  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodeToken: JwtPayload
) => {

    const isUserExist = await User.findById(userId);

    if(!isUserExist){
        throw new AppError(httpstatuscode.NOT_FOUND,"User Not Found")
    }


    if(payload.role){
        if(decodeToken.role === Role.USER || decodeToken.role ===Role.AGENT){
            throw new AppError(httpstatuscode.FORBIDDEN,"You are not authorized")
        }
        if(payload.role === Role.SUPAR_ADMIN && decodeToken.role === Role.ADMIN){
            throw new AppError(httpstatuscode.FORBIDDEN,"You are not authorized")

        }
    }
    if(payload.IsActive || payload.isApproved || payload.isApproved){
        if(decodeToken.role === Role.USER || decodeToken.role ===Role.AGENT){
            throw new AppError(httpstatuscode.FORBIDDEN,"You are not authorized")
        }
    }

    if(payload.password){
        payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
    }
    const newupdatedUser = await User.findByIdAndUpdate(userId, payload,{new :true, runValidators:true})
return newupdatedUser

};






const getAllUsers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query);
  const usersData = queryBuilder.filter().sort().fields().paginate();

  const [data, meta] = await Promise.all([
    usersData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

export const UserService = {
  createUser,
  getAllUsers,
  updateUser
};
