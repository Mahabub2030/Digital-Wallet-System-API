import { Router } from "express";
import { TransactionControlers } from "./transaction.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";




const router = Router()


router.post('/add', checkAuth(...Object(Role.USER)),TransactionControlers.AddMoney);

export const TransactionRouer =  router;