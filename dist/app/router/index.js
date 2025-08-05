"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
const transaction_routes_1 = require("../modules/transaction/transaction.routes");
const wallet_routes_1 = require("../modules/wallet/wallet.routes");
exports.router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: "/user",
        router: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        router: auth_routes_1.AuthRoutes
    },
    {
        path: "/wallet",
        router: wallet_routes_1.WalletRouer
    },
    {
        path: "/transactions",
        router: transaction_routes_1.transactionRoutes
    },
];
modulesRoutes.forEach((route) => {
    exports.router.use(route.path, route.router);
});
exports.default = exports.router;
