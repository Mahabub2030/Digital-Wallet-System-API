import express, { Request, Response } from "express"
import cors from "cors"
import router from "./app/router";
import passport from "passport";
import { envVars } from "./app/config/env";
import expressSession from "express-session";
import { walletRoutes } from "./app/modules/wallet/wallet.routes";

const app = express();

app.use(express.json())
app.use(cors())
app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/v1", router)
app.use('/api/v1/wallet', walletRoutes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Digital Wallet Backend"
    })
})

export default app