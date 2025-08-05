"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallerServices = void 0;
const wallet_model_1 = require("./wallet.model");
const getWalletByUserId = async (userId) => {
    return await wallet_model_1.Wallet.findOne({ user: userId });
};
exports.WallerServices = {
    getWalletByUserId
};
