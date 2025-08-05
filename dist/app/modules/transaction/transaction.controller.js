"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionHistory = exports.sendMoney = exports.withdrawMoney = exports.depositMoney = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse_1 = require("../../../utils/sendResponse");
const catchAsync_1 = require("../../../utils/catchAsync");
const transaction_service_1 = require("./transaction.service");
exports.depositMoney = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;
    const result = await transaction_service_1.TransactionService.deposit(userId, amount);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Money deposited successfully',
        data: result,
    });
});
exports.withdrawMoney = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;
    const result = await transaction_service_1.TransactionService.withdraw(userId, amount);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Money withdrawn successfully',
        data: result,
    });
});
exports.sendMoney = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const senderId = req.user.id;
    const { receiverPhone, amount } = req.body;
    const result = await transaction_service_1.TransactionService.send(senderId, receiverPhone, amount);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Money sent successfully',
        data: result,
    });
});
exports.getTransactionHistory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const result = await transaction_service_1.TransactionService.getHistory(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Transaction history retrieved successfully',
        data: result,
    });
});
