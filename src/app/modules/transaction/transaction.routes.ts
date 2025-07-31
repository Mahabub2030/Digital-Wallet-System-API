import express from "express";
import { getTransactions } from "./transaction.controller";


export const transactionRoutes = express.Router();

// transactionRoutes.use(authenticateJWT); // protect all routes

transactionRoutes.get("/me", getTransactions); // GET /api/v1/transactions/me
