"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRouer = void 0;
const express_1 = __importDefault(require("express"));
const wallet_controller_1 = require("./wallet.controller");
const router = express_1.default.Router();
router.get('/me', wallet_controller_1.getMyWallet);
router.patch('/block/:id', wallet_controller_1.walletControler.toggleWalletBlock);
exports.WalletRouer = router;
