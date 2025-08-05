import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import AppError from "../../errorHelpers/AppError";
import { Role } from "./user.interface";

import jwt, { JwtPayload } from "jsonwebtoken"
import { verifyToken } from "../../../utils/jwt";
import { envVars } from "../../config/env";
import { checkAuth } from "../../middlewares/checkAuth";
import { AuthControllers } from "../auth/auth.controller";


const router = Router();






router.post("/register", UserControllers.createUser);

router.get(
  "/all-users", checkAuth(Role.ADMIN, Role.SUPAR_ADMIN),UserControllers.getAllUsers);


  router.patch("/:id",checkAuth(...Object.values(Role)), UserControllers.UpdateUser)

export const UserRoutes = router;
