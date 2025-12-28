"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const env_1 = require("./app/config/env");
require("./app/config/passport");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes/routes"));
exports.app = (0, express_1.default)();
//middleware
exports.app.use((0, express_session_1.default)({
    secret: env_1.envVars.FRONTEND_URL,
    resave: false,
    saveUninitialized: false,
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.set("trust proxy", 1);
// app.use(
//   cors({
//     origin: [envVars.FRONTEND_URL],
//     credentials: true,
//   })
// );
exports.app.use((0, cors_1.default)({
    origin: [
        env_1.envVars.FRONTEND_URL,
        "https://client-g6zmzk7nr-mahabub2030s-projects.vercel.app", // ✅ NEW
        "https://client-n6ksm5skg-mahabub2030s-projects.vercel.app", // old
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
//routes
exports.app.use("/api/v1", routes_1.default);
exports.app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Welcome to the Digital Wallet Server",
    });
});
exports.app.use(globalErrorHandler_1.globalErrorHandler);
exports.app.use(notFound_1.default);
