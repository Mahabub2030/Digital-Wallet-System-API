import express from "express";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
import {
  createUserZodSchema,
  updateUserZodSchema,
} from "./user.zod.validation";

const userRoute = express.Router();
userRoute.post(
  "/register",
  zodValidateRequest(createUserZodSchema),
  UserControllers.createUser
);

userRoute.get(
  "/",
  checkAuth(...Object.values(Role)),
  UserControllers.getAllUserOrAgent
);

userRoute.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);

userRoute.patch(
  "/updateProfile",
  checkAuth(...Object.values(Role)),
  multerUpload.single("file"),
  zodValidateRequest(updateUserZodSchema),
  UserControllers.updateUserProfile
);

userRoute.patch(
  "/approve/:id",
  checkAuth(Role.ADMIN),
  UserControllers.approveAgent
);

userRoute.patch(
  "/suspend/:id",

  UserControllers.suspendAgent
);

userRoute.patch("/block/:id", UserControllers.blockUser);
userRoute.patch(
  "/unblock/:id",

  UserControllers.unBlockUser
);

export default userRoute;
