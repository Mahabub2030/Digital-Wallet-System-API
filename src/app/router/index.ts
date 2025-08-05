import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.routes";

import { transactionRoutes } from "../modules/transaction/transaction.routes";
import { WalletRouer } from "../modules/wallet/wallet.routes";

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
    router: WalletRouer
  },
 
  
  
  ];
modulesRoutes.forEach((route) => {
    router.use(route.path, route.router)
})
export default router;