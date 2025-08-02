import express from "express";
import { WalletController } from "./wallet.controller";
import { auth } from "../../middlewares/auth";



export const walletRoutes = express.Router();


walletRoutes.get("/me",auth,

    WalletController.getMyWallet);

