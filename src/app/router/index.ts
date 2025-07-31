import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { walletRoutes } from "../modules/wallet/wallet.routes";

const router = Router();


const modulesRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  },
  {
    path: "/deposit",
    router: walletRoutes
  },
  {
    path: "/wallets",
    router: walletRoutes
  }
  ];
modulesRoutes.forEach((route) => {
    router.use(route.path, route.router)
})
export default router;