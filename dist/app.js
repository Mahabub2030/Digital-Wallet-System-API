"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./app/config/passport");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./app/router"));
const passport_1 = __importDefault(require("passport"));
const env_1 = require("./app/config/env");
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// IMPORTANT: Import your passport configuration here to register strategies BEFORE using passport middleware
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: env_1.envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
// Passport middlewares: initialize and session support
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api/v1", router_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Digital Wallet Backend",
    });
});
exports.default = app;
