import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();


const modulesRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  }
  ];
modulesRoutes.forEach((route) => {
    router.use(route.path, route.router)
})
export default router;