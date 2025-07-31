import express from "express";
import { WalletController } from "./wallet.controller";

export const walletRoutes = express.Router();


walletRoutes.post("/",WalletController.createWallet);
walletRoutes.post("/deposit",WalletController.depositMoney);
