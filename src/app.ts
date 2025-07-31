import "./app/config/passport";
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import passport from "passport";
import { envVars } from "./app/config/env";
import expressSession from "express-session";
import { walletRoutes } from "./app/modules/wallet/wallet.routes";
import cookieParser from "cookie-parser";

// IMPORTANT: Import your passport configuration here to register strategies BEFORE using passport middleware
import "./app/config/passport";  // Adjust the path to where your passport config file is

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middlewares: initialize and session support
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", router);
app.use("/api/v1/wallet", walletRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Digital Wallet Backend",
  });
});

export default app;
