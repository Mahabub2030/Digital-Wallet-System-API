import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { walletRoutes } from "../modules/wallet/wallet.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";

const router = Router();


const modulesRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  },
  {
    path: "/auth",
    router: AuthRoutes,
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