"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
exports.transactionRoutes = express_1.default.Router();
// transactionRoutes.use(authenticateJWT); // protect all routes
exports.transactionRoutes.get("/me", transaction_controller_1.getTransactions); // GET /api/v1/transactions/me
