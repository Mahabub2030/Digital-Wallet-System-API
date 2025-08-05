"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.transactionTypes = void 0;
const mongoose_1 = require("mongoose");
exports.transactionTypes = ['send', 'withdraw', 'deposit'];
const transactionSchema = new mongoose_1.Schema({
    sender: { type: String, required: true },
    receiver: { type: String },
    amount: { type: Number, required: true },
    type: { type: String, enum: exports.transactionTypes, required: true },
    status: { type: String, enum: ['success', 'failed', 'pending'], default: 'success' },
}, { timestamps: true });
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
