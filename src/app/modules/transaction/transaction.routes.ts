import { Router } from "express";
import { TransactionControlers } from "./transaction.controller";


const router = Router()


router.post('/add',  TransactionControlers.AddMoney);

export const TransactionRouer =  router;