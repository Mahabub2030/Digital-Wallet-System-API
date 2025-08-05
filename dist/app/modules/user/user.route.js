"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_interface_1 = require("./user.interface");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.UserControllers.createUser);
router.get("/all-users", async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError_1.default(403, "No Have accessToken");
        }
        const verifiedToken = jsonwebtoken_1.default.verify(accessToken, "secret");
        if (!verifiedToken) {
            throw new AppError_1.default(403, `No Have access${verifiedToken}`);
        }
        if (verifiedToken.role !== user_interface_1.Role.ADMIN || user_interface_1.Role.SUPAR_ADMIN) {
        }
        console.log(verifiedToken);
        next();
    }
    catch (error) {
        next(error);
    }
}, user_controller_1.UserControllers.getAllUsers);
exports.UserRoutes = router;
