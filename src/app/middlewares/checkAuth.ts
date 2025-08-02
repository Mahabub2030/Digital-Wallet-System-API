import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { IsActive } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../../utils/jwt";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(httpStatus.FORBIDDEN, "Invalid or missing token");
      }

      const accessToken = authHeader.split(" ")[1];

      const decoded = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);

      if (typeof decoded === "string" || !decoded.email) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token payload");
      }

      const verifiedToken = decoded as JwtPayload;

      const isUserExist = await User.findOne({ email: verifiedToken.email });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }

      if (!isUserExist.isApproved) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
      }

      if (isUserExist.IsActive !== IsActive.ACTIVE) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `User is ${isUserExist.IsActive}`
        );
      }

      if (isUserExist.isDeteted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You are not permitted to view this route"
        );
      }

      // You can optionally attach user info to the request object
    //   req.user = isUserExist;

      next();
    } catch (error: any) {
      console.error("JWT Auth Error:", error.message);
      next(error);
    }
  };
