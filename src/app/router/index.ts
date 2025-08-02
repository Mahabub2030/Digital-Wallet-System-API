import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { walletRoutes } from "../modules/wallet/wallet.routes";
import { transactionRoutes } from "../modules/transaction/transaction.routes";

export const router = Router();


const modulesRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  },
  {
    path: "/auth",
    router: AuthRoutes
  },
  {
    path: "/wallet",
    router: walletRoutes
  },
  {
    path: "/transactions",
    router: transactionRoutes
  },
  
  
  ];
modulesRoutes.forEach((route) => {
    router.use(route.path, route.router)
})
export default router;