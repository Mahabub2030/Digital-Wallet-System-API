"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['deposit', 'withdraw', 'send'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'pending'],
        default: 'success',
    },
    method: {
        type: String,
        enum: ['wallet', 'bank', 'agent'],
        required: true,
    },
}, {
    timestamps: true,
});
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
