import { createNewAccessTokenWithRefreshToken } from "../../../utils/userTokens";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

import httpStatus from "http-status-codes";


const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}
export const AuthServices = {
    getNewAccessToken

}