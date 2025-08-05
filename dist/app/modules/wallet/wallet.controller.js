"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletControler = exports.getMyWallet = void 0;
const wallet_model_1 = require("./wallet.model");
const sendResponse_1 = require("../../../utils/sendResponse");
const catchAsync_1 = require("../../../utils/catchAsync");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const wallet_service_1 = require("./wallet.service");
exports.getMyWallet = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    var _a, _b;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const wallet = await wallet_service_1.WallerServices.getWalletByUserId((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Wallet fetched successfully',
        data: wallet,
    });
});
const toggleWalletBlock = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const wallet = await wallet_model_1.Wallet.findById(userId);
    //   console.log(wallet)
    //   if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    //   wallet.blocked = !wallet.blocked;
    //   await wallet.save();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: 'Wallet Bloked successfully',
        data: wallet,
    });
};
exports.walletControler = {
    toggleWalletBlock
};
