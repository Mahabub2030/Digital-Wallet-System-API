import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { Role } from "./user.interface";
const router = Router();

router.post("/register", UserControllers.createUser);

router.get(
  "/all-users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No Have accessToken");
      }


      const verifiedToken = jwt.verify(accessToken, "secret");

      if (!verifiedToken) {
        throw new AppError(403, `No Have access${verifiedToken}`);
      }

      if ((verifiedToken as JwtPayload).role !== Role.ADMIN || Role.SUPAR_ADMIN) {
      }
      console.log(verifiedToken);
      next();
    } catch (error) {
      next(error);
    }
  },

  UserControllers.getAllUsers
);

export const UserRoutes = router;
