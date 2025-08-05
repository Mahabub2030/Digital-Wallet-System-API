"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const user_interface_1 = require("../modules/user/user.interface");
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("../../utils/jwt");
const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Invalid or missing token");
        }
        const accessToken = authHeader.split(" ")[1];
        const decoded = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
        if (typeof decoded === "string" || !decoded.email) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Invalid token payload");
        }
        const verifiedToken = decoded;
        const isUserExist = await user_model_1.User.findOne({ email: verifiedToken.email });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User does not exist");
        }
        if (!isUserExist.isApproved) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is not verified");
        }
        if (isUserExist.IsActive !== user_interface_1.IsActive.ACTIVE) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User is ${isUserExist.IsActive}`);
        }
        if (isUserExist.isDeteted) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is deleted");
        }
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not permitted to view this route");
        }
        // You can optionally attach user info to the request object
        //   req.user = isUserExist;
        next();
    }
    catch (error) {
        console.error("JWT Auth Error:", error.message);
        next(error);
    }
};
exports.checkAuth = checkAuth;
