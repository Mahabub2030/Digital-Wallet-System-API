import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { createNewAccessTokenUseRefreshToken } from "../../utils/userToken";
import { User } from "../user/user.model";

const changePassword = async (
  decodedToken: JwtPayload,
  newPassword: string,
  oldPassword: string
) => {
  const isExistUser = await User.findById(decodedToken.id);
  if (!isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "ID does not exist");
  }
  if (oldPassword === newPassword) {
    throw new AppError(401, "Your password is same");
  }
  const isOldPasswordMatch = await bcrypt.compare(
    oldPassword,
    isExistUser.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Old password is incorrect");
  }
  isExistUser.password = await bcrypt.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  isExistUser.save();
};

const createNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenUseRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken.accessToken,
  };
};

export const AuthService = {
  changePassword,
  createNewAccessToken,
};
